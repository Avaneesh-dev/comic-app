import React, { useState } from 'react';
import { Spinner } from 'reactstrap';
const MainComponent = () => {
    const [inputs, setInputs] = useState(Array(10).fill(''));
    const [loading, setLoading] = useState(false);
    const [comics, setComics] = useState([]);
    const [error, setError] = useState(null);

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
                newComics[index] = response; // Assuming the API directly returns the image blob
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
            await fetchComic(inputs[i], i)
        }
    };

    return (
        <div>
            <div className="vh-55">
                <div className='row col-12 d-flex justify-content-center align-items-center' style={{ position: "absolute", zIndex: 10, marginTop: "70px" }}>
                        <div className='col-10 col-md-7 text-center'><h1 style={{ color: "white", fontSize: 30, fontFamily: "fantasy" }}>Welcome To The Dashtoon Comic Generator!</h1>
                        <h3 className='text-white'>You can generate 10 comic book pages at a time!<br />
                        Just fill out the form below with the description of what you want on each page</h3></div>
                </div>
                <div className='spikes'></div>
            </div>
            <div className='container my-5'>
                <form onSubmit={handleSubmit}>
                    <div className='row col-12'>
                    <h2>Enter Prompt for each page</h2>
                        {inputs.map((input, index) => (
                            <div key={index} className="col-md-3 mb-3">
                                <label htmlFor={`input${index + 1}`} className="form-label">
                                    Page {index + 1}:
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
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Fetch Comic!
                    </button>
                </form>
            </div>

            {loading && (
                <div className='m-3'>
                    <Spinner />
                    <p>Comic is Loading...</p>
                </div>
            )}

            {error && <p className="text-danger">{error}</p>}

            <div className="row mt-4">
                {comics.map((comic, index) => {
                    const imageUrl = URL.createObjectURL(comic);

                    return (
                        <div key={index} className="col-12 col-md-4">
                            <img src={imageUrl} alt={`Comic Page ${index + 1}`} className="img-fluid mb-4" />
                            <p>Comic Page {index + 1}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default MainComponent;
