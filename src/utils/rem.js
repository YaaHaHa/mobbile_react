/* 
    该文件是移动端适配器

*/

function adapter(){
    const dpwidth =document.documentElement.clientWidth;
    document.documentElement.style.fontSize=dpwidth/10 +'px';
}
adapter();
window.onresize=adapter;