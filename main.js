const app = () => {

    const song= document.querySelector(".song");
    const play=document.querySelector(".play");
    const outline=document.querySelector(".moving-outline circle");
    const video=document.querySelector(".vid-container video");

    //sounds
    const sounds=document.querySelectorAll(".sound-picker button");
    //time-display

    const timeDisplay=document.querySelector(".time-display");
    const timeSelect= document.querySelectorAll('.time-select button');
    //get the length of outline
    const outlineLength=outline.getTotalLength();
    // console.log(outlineLength);
    //duration
    let userDuration=600;
    outline.style.strokeDasharray=outlineLength;  
    outline.style.strokeDashoffset=outlineLength;
 // different sounds play
 sounds.forEach(sound =>{
     sound.addEventListener('click',function(){
         song.src= this.getAttribute('data-sound');
         video.src=this.getAttribute('data-video');
         checkPlaying(song);
         

     });

 });


    //playsound
        play.addEventListener('click',()=>{
            checkPlaying(song);
        });

        //selecting sound
        timeSelect.forEach(option =>{
            option.addEventListener('click',function(){
                userDuration=this.getAttribute('data-time');
                timeDisplay.textContent= `${Math.floor(userDuration/60)}:${Math.floor(userDuration%60)}`;


            });


        });


        // a function to stop and play the sounds
        const checkPlaying= song =>{
            if(song.paused){
                song.play();
                video.play();
                play.src= 'pause.svg';
    
            }
            else{
                song.pause();
                video.pause();
                play.src='play.svg';
            }


        };

        //animate the circle
        song.ontimeupdate = () => {

            let currentTime= song.currentTime;
            let elapsed=userDuration-currentTime;
            let seconds=Math.floor(elapsed%60);
            let minutes=Math.floor(elapsed/60);

            //animate the circle
            let progress=outlineLength-(currentTime/userDuration)*outlineLength;
            outline.style.strokeDashoffset=progress;
            //animating text
            timeDisplay.textContent = `${minutes}:${seconds}`;
            if(currentTime>=userDuration){
                song.pause();
                song.currentTime=0;video.pause();
                play.src='play.svg';
                video.pause();
            }

        };
        


};
app();