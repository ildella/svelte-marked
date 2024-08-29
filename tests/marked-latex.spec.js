import { marked } from 'marked'

const tokenizer = {
  codespan(src) {
    const inlineMatch = src.match(/^\$([^\$\n]+?)\$/)
    if (inlineMatch) {
      return {
        type: 'codespan',
        raw: inlineMatch[0],
        text: inlineMatch[1].trim()
      }
    }
    return false
  },
}

test('inline $', () => {
  const parsed = marked.parse('$ latex code $\n\n` other code `')
  expect(parsed).toEqual(`<p>$ latex code $</p>
<p><code>other code</code></p>
`)
})


test('inline $ with custom tokenizer', () => {
  marked.use({tokenizer})
  const parsed = marked.parse('$ latex code $\n\n` other code `')
  expect(parsed).toEqual(`<p><code>latex code</code></p>
<p><code>other code</code></p>
`)
})

test('block $$', () => {
  const parsed = marked.parse(`
    $$
    \nabla \times (\nabla f) = 0
    $$`
  )
  expect(parsed).toEqual('<pre><code>$$\n</code></pre>\n<p>abla \times (\nabla f) = 0\n    $$</p>\n')
})

test('block $$ with custom tokenizer' , () => {
  marked.use({tokenizer})
  const parsed = marked.parse(`
    $$
    \nabla \times (\nabla f) = 0
    $$`
  )
  expect(parsed).toEqual('???')
})

test('inline \(', () => {
  const parsed = marked.parse(`where \( \nabla \) is the del operator.`)
  expect(parsed).toEqual(`<p>where ( 
abla ) is the del operator.</p>
`)
})

test('inline \( with custom tokenizer', () => {
  const parsed = marked.parse(`where \( \nabla \) is the del operator.`)
  expect(parsed).toEqual(`???`)
})

test('parse \[ block latex notation', () => {
  const parsed = marked.parse(`        ### Conclusion
        
        Thus, we have proven that:
        
        \[
        \nabla \times (\nabla f) = 0
        \]
`)
  console.log({parsed})
  expect(parsed).toEqual(`<pre><code>    ### Conclusion
    
    Thus, we have proven that:
    
    [
    
</code></pre>
<p>abla       imes (
abla f) = 0
        ]</p>
`)
})


