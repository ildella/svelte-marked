<script>
  import { setContext, createEventDispatcher, onMount } from 'svelte'
  import { marked } from 'marked'
  import Slugger from 'github-slugger'

  import Parser from './Parser.svelte'
  import { defaultOptions, defaultRenderers } from './markdown-parser'
  import { key } from './context'

  export let source = []
  export let tokenizers = []
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
    // console.log('extra tokenizers:', tokenizers)
    tokenizers.forEach(tokenizer => marked.use({tokenizer}))
    // const tokenizer = {
    //   codespan (src) {
    //     console.log({src})
    //     const match = src.match(/^\$+([^$\n]+?)\$+/)
    //     // const match = src.match(/\$(.+?)\$/g)
    //     console.log({match})
    //     if (match) {
    //       return {
    //         type: 'codespan',
    //         raw: match[0],
    //         text: match[1].trim(),
    //       }
    //     }
    //     // return false to use original codespan tokenizer
    //     return false
    //   },
    // }
    // marked.use({tokenizer})

    const lexer = new marked.Lexer(combinedOptions)

    // const cleaned = source.replaceAll('\[', '$$').replaceAll('\]', '$$')
    const cleaned = source
    tokens = isInline ? lexer.inlineTokens(cleaned) : lexer.lex(cleaned)
    // console.log({source, cleaned, isInline})
    // console.log({cleaned})
    // console.log({tokens})
    const sample = tokens[32]
    console.log(sample)
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
  })
</script>

<Parser {tokens} renderers={combinedRenderers} />
