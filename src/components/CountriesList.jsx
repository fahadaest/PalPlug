import React, { useEffect, useState } from 'react';
import { useFetchCountriesQuery } from '@/app/redux/slice/apislice/apislice.js';

const CountriesList = () => {
  const { data, error, isLoading } = useFetchCountriesQuery();
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    const storedData = localStorage.getItem('countries');
    if (storedData) {
      setCountries(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    if (data && data.countries) {
      setCountries(data.countries);
      localStorage.setItem('countries', JSON.stringify(data.countries));
    }
  }, [data]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching countries</p>;

  return (
    <div>
      <h2>Countries List</h2>
      <ul>
        {countries.length > 0 ? (
          countries.map((country, idx) => <li key={idx}>{country}</li>) 
        ) : (
          <p>No countries found.</p>
        )}
      </ul>
    </div>
  );
};

export default CountriesList;