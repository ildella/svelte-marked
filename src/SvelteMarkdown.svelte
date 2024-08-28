<script>
  import { setContext, createEventDispatcher, onMount } from 'svelte'
  import { marked } from 'marked'
  import Slugger from 'github-slugger'

  import Parser from './Parser.svelte'
  import { defaultOptions, defaultRenderers } from './markdown-parser'
  import { key } from './context'

  export let source = []
  export let renderers = {}
  export let options = {}
  export let isInline = false

  const dispatch = createEventDispatcher();

  let tokens;
  // let lexer;
  let mounted;

  $: preprocessed = Array.isArray(source)
  $: slugger = source ? new Slugger : undefined
  $: combinedOptions = { ...defaultOptions, ...options }
  $: if (preprocessed) {
    tokens = source
  } else {
    // lexer = new Lexer(combinedOptions)
    const lexer = new marked.Lexer(combinedOptions)

    tokens = isInline ? lexer.inlineTokens(source) : lexer.lex(source)
    const sample = tokens[21]
    console.log({source}, sample)
    dispatch('parsed', { tokens })
  }

  $: combinedRenderers = { ...defaultRenderers, ...renderers }

  setContext(key, {
    slug: (val) => slugger ? slugger.slug(val) : '',
    getOptions: () => combinedOptions
  })
  $: mounted && !preprocessed && dispatch('parsed', { tokens })

  onMount(() => {
    mounted = true
  });
</script>

<Parser {tokens} renderers={combinedRenderers} />
