import React, { useState, useContext, useCallback, useEffect } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { Loader } from '../Components/Loader'
import { LinkList } from '../Components/LinksList'

export const LinkshPage = () => {
    const [links, setLinks] = useState([])
    const { loading, request } = useHttp()
    const { token } = useContext(AuthContext)

    const fetchLinks = useCallback(async () => {
        try {
            const fetched = await request('/api/link', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLinks(fetched)
        } catch (e) { }
    }, [token, request])

    useEffect( () =>{
        fetchLinks()
    },[fetchLinks]) 

    if(loading){
        return <Loader/>
    }
    return (
        <>
            {!loading && <LinkList links={links}/>}
        </>
    )
}