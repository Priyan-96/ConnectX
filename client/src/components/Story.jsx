import React from 'react';

export default function Story({ story }) {
    return (
        <div className='flex-1 overflow-hidden cursor-pointer rounded-md object-cover relative' key={story.id} setIsViewStory={true}>
            <img src={story.img} alt='' />
            <span className='absolute left-[10px] bottom-[10px] text-white font-medium'>{story.name}</span>
        </div>
    )
}
