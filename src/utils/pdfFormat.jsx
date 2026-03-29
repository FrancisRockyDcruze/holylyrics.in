export function pdfFormats(
    songs,
    favSogList,
    leftCol_Arr,
    rightCol_Arr,
    totalPg,
    line_Cntr
){  
    let fullLyrics_Arr = [];   
    let AllTitle_Arr = []; 
    let Title_Lyrics_Arr = [];
    let MkCntrStop = line_Cntr;
    let fixed_Cntr = line_Cntr;
    let col_marker = 0;

    let Mkcounter = 0;
    let globalKey = 0;

    if(songs[0] != undefined) 
    {
        favSogList.forEach(s => {
            
           let titleStr = s["Title*"];
           let arrStr = (s["lyrics*"]);
           let lines = arrStr.split(/<br\s*\/?>/);
           
           Title_Lyrics_Arr.push(<div key={`${globalKey++}`} className="font-bold py-3 text-lg underline">{titleStr}</div>);
           lines.forEach((line,idx) => {
                Title_Lyrics_Arr.push(<div key={`${globalKey++}-title-${titleStr}-line-${idx}`} className="text-sm">{line}</div>);
                
            });
            
           fullLyrics_Arr.push(...lines); // add all lines
           AllTitle_Arr.push(titleStr);
        });

        // console.log(Title_Lyrics_Arr);

        totalPg.push(col_marker);

        if(Title_Lyrics_Arr.length > 0) 
        {
            while (Mkcounter < Title_Lyrics_Arr.length)
            {
                for (let i = Mkcounter; i <= MkCntrStop; i++)
                {
                    if (!leftCol_Arr[col_marker]) {
                        leftCol_Arr[col_marker] = [];
                    }
                    leftCol_Arr[col_marker].push(Title_Lyrics_Arr[i]);
                }

                Mkcounter = MkCntrStop + 1;
                MkCntrStop = MkCntrStop + fixed_Cntr;

                for (let i = Mkcounter; i <= MkCntrStop; i++)
                {
                    if (!rightCol_Arr[col_marker]) {
                        rightCol_Arr[col_marker] = [];
                    }
                    
                    rightCol_Arr[col_marker].push(Title_Lyrics_Arr[i]);
                }

                Mkcounter = MkCntrStop + 1;
                MkCntrStop = MkCntrStop + line_Cntr;

                if (Mkcounter <= Title_Lyrics_Arr.length)
                {
                    col_marker++;
                    // console.log(col_marker);
                    totalPg.push(col_marker);
                }
            }
        }        
    }

    return {
        fullLyrics_Arr,
        AllTitle_Arr,
        Title_Lyrics_Arr,
        leftCol_Arr,
        rightCol_Arr,
        totalPg,
        Mkcounter,
        MkCntrStop,
        col_marker,
        globalKey
    };
}