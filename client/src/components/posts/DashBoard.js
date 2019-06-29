import React from 'react';
import CreatePost from './CreatePost';
import Feed from './Feed';

export default function DashBoard() {
    return (
        <div style={{marginTop:'20px'}}>
            <CreatePost/>
            <Feed/>
        </div>
    )
}
