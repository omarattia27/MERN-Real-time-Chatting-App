import axios from 'axios';

export const Get = async () => {
    // fetch data from a url endpoint
    const data = await axios.get("http://localhost:5000/api/");
    console.log('get data: ',data);
    return data.data;
}

export const Post = async (newArticle) => {
// fetch data from a url endpoint
const data = await axios.post("http://localhost:5000/api/", newArticle);
console.log('post data: ',data,'AND ',data.data._id);
return data.data._id;
}

export const Delete = async (id) => {
// fetch data from a url endpoint
const data = await axios.delete("http://localhost:5000/api/"+id);
console.log("Succesful Deletion");
return data.data;
}

export const Put = async (id,message) => {
    // fetch data from a url endpoint
    console.log('put data: ',message);
    const data = await axios.put("http://localhost:5000/api/"+id, message);
    //console.log('put data: ',data);
    return data.data;
    }