export const getAllCharacter = async () => {
    const res= await fetch("https://rickandmortyapi.com/api/character");
    return res?.json();
};

export const getSearchCharacter = async (searchText) => {
    const res = await fetch (`https://rickandmortyapi.com/api/character/?name=${searchText}`)
    return res.json()
}
