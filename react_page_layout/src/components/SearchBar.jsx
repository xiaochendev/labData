export default function SearchBar({searchText, setSearchText, onSearch}) {
  const handleChange = (e) => {
    const text = e.target.value;
    setSearchText(text);

    // call onSearch with first matching employee or null
    if (text.trim() === "") {
      onSearch(null);
      return;
    };
    
      // onSearch is called with text (parent finds employee)
    onSearch(text);
  };

  return (
    <input 
      type="text"
      value={searchText}
      onChange={handleChange}
      placeholder="Searching...."
     />
  ) 
}