$(document).ready(function(){

    $('button:not("#generator")').click(function(e){

        e.preventDefault();

        var data = {
            name : $('#inputName').val(),
            age : $('#inputAge').val()
        }

        if (data.name.length > 3) {
            sentToServer();
        }else {
            $('#inputName').css('border-color', 'red')
        }

        console.log(data)

    });

    function sentToServer(){
        console.log("Se envio al servidor")
    }

    var cats;

    function getRandomImages(){
        $.ajax({
            url : 'http://thecatapi.com/api/images/get?format=xml&results_per_page=100',
            success : function(response){
                cats = xmlToJson(response);
            }
        })
    }

    getRandomImages();

    function getRandomCatImage(index){
        return cats.response.data.images.image[index].url["#text"]
    }

    $('button').click(function(){
        getRandomImages();
        $('#container').empty();
        $.ajax({
            url : 'https://jsonplaceholder.typicode.com/posts',
            method : 'get',
            success : function(result){
                result.forEach(function(element, index){
                    $('#container').append(
                        '<div class="book">'+
                        '<img src="'+getRandomCatImage(index)+'">' +
                        '<div class="text-wrapper">'+
                        '<h3>' + element.title + '</h3>' +
                        '<p>' + element.body + '</p>' +
                        '</div>' +
                        '</div>')
                    })
                },
                error : function (result){
                    console.log('Error')
                }
            })
        })

        // Ignore this:
        function xmlToJson(xml) {var obj = {};if (xml.nodeType == 1) {if (xml.attributes.length > 0) {obj["@attributes"] = {};for (var j = 0; j < xml.attributes.length; j++) {var attribute = xml.attributes.item(j);obj["@attributes"][attribute.nodeName] = attribute.nodeValue;}}} else if (xml.nodeType == 3) {obj = xml.nodeValue;}if (xml.hasChildNodes()) {for(var i = 0; i < xml.childNodes.length; i++) {var item = xml.childNodes.item(i);var nodeName = item.nodeName;if (typeof(obj[nodeName]) == "undefined") {obj[nodeName] = xmlToJson(item);} else {if (typeof(obj[nodeName].push) == "undefined") {var old = obj[nodeName];obj[nodeName] = [];obj[nodeName].push(old);}obj[nodeName].push(xmlToJson(item));}}}return obj;};

    })
