import React, { useState } from 'react';

const MainComponent = () => {
  const [inputs, setInputs] = useState(Array(10).fill(''));
  const [loading, setLoading] = useState(false);
  const [comics, setComics] = useState([]);
  const [error, setError] = useState(null);
  console.log(comics);
//   console.log(inputs);

async function query(data) {
	const response = await fetch(
		"https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
		{
			headers: { 
				"Accept": "image/png",
				"Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM", 
				"Content-Type": "application/json" 
			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.blob();
	return result;
}
  const fetchComic = async (input, index) => {
    try {
      setLoading(true);
      const data = { "inputs": input };
      const response = await query(data);
      setComics((prevComics) => {
        const newComics = [...prevComics];
        newComics[index] = URL.createObjectURL(response); // Assuming the API directly returns the image blob
        return newComics;
      });
    } catch (error) {
      setError(`Error fetching comic ${index + 1}: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();    
    for (let i = 0; i < inputs.length; i++) {
      await fetchComic(inputs[i], i);
        // Use image
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        {inputs.map((input, index) => (
          <div key={index} className="mb-3">
            <label htmlFor={`input${index + 1}`} className="form-label">
              Input {index + 1}:
            </label>
            <input
              type="text"
              className="form-control"
              id={`input${index + 1}`}
              value={input}
              onChange={(e) => {
                const newInputs = [...inputs];
                newInputs[index] = e.target.value;
                setInputs(newInputs);
              }}
            />
          </div>
        ))}
        <button type="submit" className="btn btn-primary">
          Fetch Comics
        </button>
      </form>

      {loading && <p>Loading...</p>}

      {error && <p className="text-danger">{error}</p>}

      <div className="row mt-4">
        {comics.map((comic, index) => (
          <div key={index} className="col">
            <img src={comic.substring(5)} alt={`Comic ${index + 1}`} className="img-fluid" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainComponent;
