export const ngefetchsoal = async () => {
    const response = await fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple");
    const data = (await response.json()).results

    console.log(data);
    
    return data
}