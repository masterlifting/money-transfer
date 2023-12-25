/** @format */

import React, { useEffect, useMemo, useState } from 'react';
import { InputClass } from '../../styles/input';

interface ISearchDropdownProps {
  title: string;
  state: string;
  setState: (value?: string) => void;
  searchFunc: (value: string) => string[];
}

export const AutoComplete = ({ title, state, setState, searchFunc: search }: ISearchDropdownProps) => {
  const [searchTerm, setSearchTerm] = useState(state ?? '');
  const [searchResult, setSearchResult] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const debouncedSearch = useMemo(() => {
    const delay = 300;
    let timeoutId: ReturnType<typeof setTimeout>;

    return (query: string) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => setSearchResult(search(query)), delay);
    };
  }, [search]);

  useEffect(() => {
    if (searchTerm) {
      debouncedSearch(searchTerm);
    } else {
      setSearchResult([]);
    }
  }, [searchTerm, debouncedSearch]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value !== state) {
      setState();
    }

    setSearchTerm(value);
  };

  const onOptionClick = (x: string) => {
    setState(x);
    setSearchTerm(x);
    setShowSuggestions(false);
  };

  return (
    <div className='w-full relative'>
      <input
        type='text'
        name={`${title} search`}
        title={`Start typing to search ${title}`}
        placeholder={`Search ${title} ...`}
        className={InputClass.Text}
        value={searchTerm}
        onChange={onInputChange}
        onFocus={() => setShowSuggestions(true)}
      />
      {showSuggestions && searchTerm && (
        <ul
          role='listbox'
          className='absolute z-10 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto'
        >
          {searchResult.map((x, i) => (
            <li
              key={`${x}-${i}`}
              className='px-4 py-2 cursor-pointer hover:bg-gray-100'
              role='option'
              aria-selected={false}
              onClick={() => onOptionClick(x)}
            >
              {x}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
