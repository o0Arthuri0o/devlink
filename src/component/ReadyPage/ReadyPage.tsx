import React from 'react'
import './ReadyPage.scss'

const ReadyPage = () => {

    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImdyYWdAbWFpbC5jb20iLCJpYXQiOjE3MDU0MDk2NTUsImV4cCI6MTcwNTQxMzI1NX0.m96qm6V8rZlwg38YAeXj5d7A34JvgSTUZ0UDfK2OMdY'
    // function parseJwt (token) {
    //   var base64Url = token.split('.')[1];
    //   var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    //   var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
    //       return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    //   }).join(''));

    //   return JSON.parse(jsonPayload);
    // }
    // console.log(parseJwt(token).email)

    return (
    <div>ReadyPage</div>
    )
}

export default ReadyPage