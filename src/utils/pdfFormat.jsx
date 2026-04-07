export function pdfFormats(
    songs,
    favSogList,
    leftCol_Arr,
    rightCol_Arr,
    totalPg,
    line_Cntr,
    isMobilePreview
){  
    let fullLyrics_Arr = [];   
    let AllTitle_Arr = []; 
    let Title_Lyrics_Arr = [];
    let MkCntrStop = line_Cntr;
    let fixed_Cntr = line_Cntr +1;
    let col_marker = 0;

    let Mkcounter = 0;
    let globalKey = 0;

    // console.log(isMobilePreview);
    
    const titleClassfirstline = isMobilePreview ? "font-bold pb-2 text-[14px] underline" : "font-bold pb-3 text-lg underline";
    const titleClass = isMobilePreview ?  "font-bold py-2 pt-3 text-[14px] underline" : "font-bold py-3 text-lg underline";
    const lineClass = isMobilePreview ? "text-[12px]" : "text-sm";
// const lineClass = isMobilePreview ? "text-sm" : "text-sm";
    if(songs[0] != undefined) 
    {
        let firstLine = 1;

        favSogList.forEach(s => {
            
           let titleStr = s["Title*"];
           let arrStr = (s["lyrics*"]);
           let lines = arrStr.split(/<br\s*\/?>/);
           

           if(firstLine == 1)
           {
               Title_Lyrics_Arr.push(<div key={`${globalKey++}`} className={titleClassfirstline}>{titleStr}</div>);
               lines.forEach((line,idx) => {
                    const content = line.trim() === "" ? "\u00A0" : line;
                    Title_Lyrics_Arr.push(<div key={`${globalKey++}-title-${titleStr}-line-${idx}`} className={lineClass}>{content}</div>);
                    
                });
           }
            else
            {
                Title_Lyrics_Arr.push(<div key={`${globalKey++}`} className={titleClass}>{titleStr}</div>);
                lines.forEach((line,idx) => {
                     const content = line.trim() === "" ? "\u00A0" : line;
                     Title_Lyrics_Arr.push(<div key={`${globalKey++}-title-${titleStr}-line-${idx}`} className={lineClass}>{content}</div>);
                     
                 });
            }
            

           fullLyrics_Arr.push(...lines); // add all lines
           AllTitle_Arr.push(titleStr);
           firstLine++;
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

                // console.log(leftCol_Arr);

                Mkcounter = MkCntrStop + 1;
                MkCntrStop = MkCntrStop + fixed_Cntr;

                for (let i = Mkcounter; i <= MkCntrStop; i++)
                {
                    if (!rightCol_Arr[col_marker]) {
                        rightCol_Arr[col_marker] = [];
                    }
                    
                    rightCol_Arr[col_marker].push(Title_Lyrics_Arr[i]);
                }

                // console.log(rightCol_Arr);

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