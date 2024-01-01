import { FC } from "react";


interface LsTextItemProps{
  text: string;
  ftypecss: string;
  searchTerm: string, 
}
export const LsTextItem:FC<LsTextItemProps> = ({text, ftypecss, searchTerm}) => {
  // set highlight on search term
  const searchTermCSS = 'text-orange-600'
  const split = text.split(searchTerm)
  const terms_inserted = []
  for (let i=0; i<split.length; i++) {
      // insert non searchTerm
      if (split[i] !== '') {
          terms_inserted.push({text: split[i], css: ftypecss})
      }
      // insert searchTerm
      if (searchTerm !== '' && i !== split.length-1) {
          terms_inserted.push({text: searchTerm, css: searchTermCSS})
      }
  } 
  return (
    <>
    {terms_inserted.map((i, ix) => {
      const css = i.css
      return (
        <span key={ix} className={css}>{i.text}</span>
      )
    })}
    </>
  )
}