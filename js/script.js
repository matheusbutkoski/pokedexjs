const pokemonNome = document.querySelector('.pokemon-nome');
const pokemonNumero = document.querySelector('.pokemon-numero');
const pokemonImagem = document.querySelector('.pokemon-imagem');
const input = document.querySelector('.input-search');
const form = document.querySelector('.form');
const btnProx = document.querySelector('.btn-prox');
const btnAnt = document.querySelector('.btn-ant');
const btnMutar = document.querySelector('.desmutado');
const btnDesmutar = document.querySelector('.mutado');

let procurarPokemon = 1;

btnDesmutar.addEventListener('click', function(){
    const music = document.querySelector('.musica');
    music.play();
    music.volume = 0.03;
    btnMutar.style.display = 'block';
    btnDesmutar.style.display = 'none';

});

btnMutar.addEventListener('click', function(){
    const music = document.querySelector('.musica');
    music.pause();
    btnMutar.style.display = 'none';
    btnDesmutar.style.display = 'block';

});


const fetchPokemon = async (pokemon) => {
    const respostaAPI = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(respostaAPI.status == 200){
    const data = await respostaAPI.json();
    return data;
    }
}

const renderPokemon = async (pokemon) => {
    pokemonNome.innerHTML = 'Carregando...';
    pokemonNumero.innerHTML = '';

    const dataPokemon = await fetchPokemon(pokemon);
if(dataPokemon){
    pokemonImagem.style.display = 'block';
    pokemonNome.innerHTML = dataPokemon.name;
    pokemonNumero.innerHTML = dataPokemon.id;
    pokemonImagem.src = dataPokemon['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    input.value = '';
    procurarPokemon = dataPokemon.id;
}else{
    pokemonImagem.style.display = 'none';
    pokemonNome.innerHTML = "Pokemon Inválido"
    pokemonNumero.innerHTML = ''
}
    
}


const funcSubmit = (event) => {  
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
    
}
form.addEventListener('submit', funcSubmit);


const butProx = () => {    
    procurarPokemon++;
    renderPokemon(procurarPokemon);
}
btnProx.addEventListener('click', butProx);


const butAnt = () => {  
    if(procurarPokemon > 1){
         procurarPokemon--;
    renderPokemon(procurarPokemon);
    }
   
}
btnAnt.addEventListener('click', butAnt);

renderPokemon(procurarPokemon);



