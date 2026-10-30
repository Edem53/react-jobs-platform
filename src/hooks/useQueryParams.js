import {useLocation, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";

export const useQueryParams = () => {
    const location = useLocation();
    const [_, setSearchParams] = useSearchParams();
    const [queryParams, setQueryParams] = useState({});

    const updateQueryParams = (params = {}) => {
        setQueryParams({
            ...queryParams,
            ...params
        });
    };

    const clearQueryParams = () => {
        setQueryParams({});
    };

    useEffect(() => {
        const queryParams = location.search;
        const newSearchParams = new URLSearchParams(queryParams);

        setQueryParams(Object.fromEntries(newSearchParams.entries()));
    }, []);

    useEffect(() => {
        const newSearchParams = new URLSearchParams(queryParams);

        setSearchParams(newSearchParams);
    }, [queryParams]);


    return {
        queryParams,
        updateQueryParams,
        clearQueryParams
    };
};