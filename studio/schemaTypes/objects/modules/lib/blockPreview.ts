export function getFirstBlockText(blocks: any[] = []): string | undefined {
  const block = (blocks || []).find((block: any) => block?._type === 'block')
  return block?.children
    ?.filter((child: any) => child?._type === 'span')
    ?.map((span: any) => span.text)
    ?.join('')
}
