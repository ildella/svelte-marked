<script>
  import { run } from 'svelte/legacy'

  import { setContext, createEventDispatcher, onMount } from 'svelte'
  import { marked } from 'marked'
  import Slugger from 'github-slugger'

  import Parser from './Parser.svelte'
  import { defaultOptions, defaultRenderers } from './markdown-parser'
  import { key } from './context'

  let {
    source = [],
    renderers = {},
    options = {},
    isInline = false
  } = $props()

  // const dispatch = createEventDispatcher()

  let tokens = $state()
  // let mounted = $state()

  let preprocessed = $derived(Array.isArray(source))
  let slugger = $derived(source ? new Slugger : undefined)
  let combinedOptions = $derived({ ...defaultOptions, ...options })
  let combinedRenderers = $derived({ ...defaultRenderers, ...renderers })

  // function dispatch(eventName, detail) {
  //   const event = new CustomEvent(eventName, { detail });
  //   dispatchEvent(event);
  // }
  
  $effect(() => {
    if (preprocessed) {
      tokens = source
    } else {
      const lexer = new marked.Lexer(combinedOptions)
      tokens = isInline ? lexer.inlineTokens(source) : lexer.lex(source)
      // dispatch('parsed', { tokens })
    }
  })
  // run(() => {
  //   mounted && !preprocessed && dispatch('parsed', { tokens })
  // })

  setContext(key, {
    slug: (val) => slugger ? slugger.slug(val) : '',
    getOptions: () => combinedOptions
  })

  // onMount(() => {
  //   mounted = true
  // })
</script>

<Parser {tokens} renderers={combinedRenderers} />
