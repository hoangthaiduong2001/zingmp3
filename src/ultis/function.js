export const GetArrSlider = (start, end, number) => {
    let output = []
    const limit = start > end ? number : end
    for (let i = start; i <= limit; i++){
        output.push(i);
    }
    if(start > end){
        for( let i = 0; i <= end; i++){
            output.push(i)
        }
    }
    return output
}

