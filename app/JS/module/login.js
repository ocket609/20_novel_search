

function signup(){
    axios.post('http://localhost:3000/signup',
   {
      "email": "olivier@mail.com",
      "password": "bestPassw0rd"
   } )
    
      .then(function(response){
       console.log(response);
       
      })
      .catch(function(error){
          //pagesbody.innerHTML = ``;
          console.log(error.response);
          //window.setTimeout("alert('無效連結，將導向回首頁')",50);
          //setTimeout("location.href='/'",500);
        
      })
}

let token = '';

function login(){
    axios.post('http://localhost:3000/login',
   {
      "email": "olivier@mail.com",
      "password": "bestPassw0rd"
   } )
    
      .then(function(response){
        token = response.data.accessToken;
        console.log(token);
       console.log(response);
       postToken(token);
       
      })
      .catch(function(error){
          console.log(error.response);  
      })
}

function postToken(t){
    axios.patch('http://localhost:3000/users/1',
   {
      "token": `${t}`,

   } )
    
      .then(function(response){
       console.log(response);
       
      })
      .catch(function(error){
          console.log(error.response);
    
      })
}