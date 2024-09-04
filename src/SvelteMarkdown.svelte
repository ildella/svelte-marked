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

  const dispatch = createEventDispatcher()

  let tokens
  let mounted

  $: preprocessed = Array.isArray(source)
  $: slugger = source ? new Slugger : undefined
  $: combinedOptions = { ...defaultOptions, ...options }
  $: if (preprocessed) {
    tokens = source
  } else {
    const lexer = new marked.Lexer(combinedOptions)
    tokens = isInline ? lexer.inlineTokens(source) : lexer.lex(source)
    dispatch('parsed', { tokens })
  }
  $: combinedRenderers = { ...defaultRenderers, ...renderers }
  $: mounted && !preprocessed && dispatch('parsed', { tokens })

  setContext(key, {
    slug: (val) => slugger ? slugger.slug(val) : '',
    getOptions: () => combinedOptions
  })

  onMount(() => {
    mounted = true
  })
</script>

<Parser {tokens} renderers={combinedRenderers} />
