import React from 'react';

export default ({ onSearch, gifs }) => {
  return (
    <div id="gif-list">
      <form className="spec-gif-search-form" onSubmit={onSearch}>
        <input name="search" className="spec-gif-search-input" type="search"/>
        <button type="submit" className="spec-gif-search-submit">Search</button>
      </form>

      <ul className="spec-gif-list">
        {gifs.map((gif) => (
          <li key={gif.id} className="spec-gif">
            <img width={gif.images.original.width}
                 height={gif.images.original.height}
                 src={gif.images.original.url}/>
          </li>
        ))}
      </ul>
    </div>
  );
}
