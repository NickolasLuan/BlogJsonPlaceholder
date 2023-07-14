// https://jsonplaceholder.typicode.com/posts

async function readPosts() {
    const postArea = document.querySelector('.posts');
    postArea.innerHTML = 'Carregando...';

    let response = await fetch("https://jsonplaceholder.typicode.com/posts");
    let json = await response.json();

    if (json.length > 0) {
        postArea.innerHTML = "";

        for( i in json) {
            let textArea = `<div><h1>${json[i].title}</h1>${json[i].body}<hr></div>`;
            postArea.innerHTML += textArea;
        }

    } else {
        postArea.innerHTML = "Nenhum post encontrado."
    }
}

async function newPost(title,body) {
    await fetch('https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title:title,
                body:body,
                userId: 2
            })
        }
    );

    document.querySelector('#titleField').value = '';
    document.querySelector('#bodyField').value = '';
    
    readPosts();
 
}





document.querySelector('#insertButton').addEventListener('click', () => {
    let title = document.querySelector('#titleField').value;
    let body = document.querySelector('#bodyField').value;

    if(title && body) {
        newPost(title,body);
    } else {
        postArea.innerHTML = 'Nenhum post para exibir...';
    }

})
readPosts();