// News.jsx
import { React, useState, useEffect } from 'react';
import Card from './Card';
import Loader from './Loader';
import "./news.css"

function News() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    function handlePrev() {
        setPage(page - 1);
    }

    function handleNext() {
        setPage(page + 1);
    }

    let pageSize = 12;

    useEffect(() => {
        setIsLoading(true);
        setError(null);
        fetch(`https://news-aggregator-dusky.vercel.app/all-news?page=${page}&pageSize=${pageSize}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok');
            })
            .then(myJson => {
                if (myJson.success) {
                    setTotalResults(myJson.data.totalResults);
                    setData(myJson.data.articles);
                } else {
                    setError(myJson.message || 'An error occurred');
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
                setError('Failed to fetch news. Please try again later.');
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [page]);

    return (
        <>
            <div className="news-wrapper">
                {error && <div className="text-red-500 mb-4">{error}</div>}
                    {!isLoading ? data.map((element, index) => (
                        <Card
                            title={element.title}
                            description={element.description}
                            imgUrl={element.urlToImage}
                            publishedAt={element.publishedAt}
                            url={element.url}
                            author={element.author}
                            source={element.source.name}
                            key={index}
                        />
                    )) : <Loader />}
                    {
                        !isLoading && data.length > 0 && (
                            <div className="pagination">
                                <button disabled={page <= 1} className='pagination-btn' onClick={handlePrev}>&larr; Prev</button>
                                <p className='font-semibold opacity-80'>{page} of {Math.ceil(totalResults / pageSize)}</p>
                                <button className='pagination-btn' disabled={page >= Math.ceil(totalResults / pageSize)} onClick={handleNext}>Next &rarr;</button>
                            </div>
                        )
                    }
                </div>
        </>
    );
}

export default News;
