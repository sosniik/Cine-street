module.exports = {
    waitingLoop: async (object, func)=>{
        function waitforme(milisec) { 
            return new Promise(resolve => { 
                setTimeout(() => { resolve('') }, milisec); 
            }) 
        } 
        async function printy() { 
            for (let i in object) { 
                await waitforme(50); 
                func(i, object)
            } 
            console.log("Loop execution finished!"); 
        } 
        printy();
    }
}