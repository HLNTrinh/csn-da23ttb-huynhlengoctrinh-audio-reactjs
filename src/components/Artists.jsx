import React from 'react'


const artists = [
{ name: 'Juky San ', img: 'https://image-cdn.nct.vn/singer/avatar/2025/06/09/K/L/l/g/1749461016612_300.jpg' },
{ name: 'Dương Domic', img: 'https://image-cdn.nct.vn/singer/avatar/2025/05/19/O/L/L/Y/1747623377196_300.jpg' },
{ name: 'Vũ', img: 'https://image-cdn.nct.vn/singer/avatar/2024/09/26/M/6/m/F/1727345194543_300.png' },
{ name: 'Hà Anh Tuấn', img: 'https://image-cdn.nct.vn/singer/avatar/2025/04/08/h/N/S/F/1744079427105_300.png' },
{ name: 'Vũ Cát Tường.', img: 'https://image-cdn.nct.vn/singer/avatar/2025/10/13/3/l/x/0/1760322878287_300.jpg' },
]


export default function Artists(){
return (
<div className="artists-row">
{artists.map((a, i) => (
<div className="artist" key={i}>
<div className="artist-photo" style={{backgroundImage:`url(${a.img})`}} />
<div className="artist-name">{a.name}</div>
</div>
))}
</div>
)
}