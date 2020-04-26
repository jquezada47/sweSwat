import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Select extends Component {

  constructor(props) {
    super(props);
    this.state = {days: []};
  }

  componentDidMount() {
    window.scrollTo(0, 0);
   
  const search = {

    location: '',
    day: this.props.location.state.day,
    start: '',
    end: '',
    title: this.props.location.state.title
  }

  axios.post('http://localhost:5000/movie/search', search)
  .then(res => {
    this.setState({ days: res.data })
  });
  }

  

  text(){
    let title = this.props.location.state.title
    if(title=="Star Wars; The Rise of Skywalker"){
      return (<>The surviving members of the resistance face the First Order once again, 
        and the legendary conflict between the Jedi and the Sith reaches its peak 
        bringing the Skywalker saga to its end.<br/>—Santhosh<br/><br/>
        While the First Order continues to ravage the galaxy, Rey finalizes her training as a Jedi. 
        But danger suddenly rises from the ashes as the evil Emperor Palpatine mysteriously returns 
        from the dead. While working with Finn and Poe Dameron to fulfill a new mission, 
        Rey will not only face Kylo Ren once more, but she will also finally discover the truth 
        about her parents as well as a deadly secret that could determine her future and the 
        fate of the ultimate final showdown that is to come.<br/>—Blazer346<br/></>)
      }
      else if(title=="Onward"){
        return (<>Two elven brothers embark on a quest to bring their father back for one day.<br/><br/>
        Set in a suburban fantasy world, two teenage elf brothers, Ian and Barley Lightfoot, 
        go on an journey to discover if there is still a little magic left out there in order 
        to spend one last day with their father, who died when they were too young to remember him.
        <br/><br/>
        Teenage elf brothers Ian and Barley embark on a magical quest to spend one more day with
        their late father. Like any good adventure, their journey is filled with cryptic maps, 
        impossible obstacles and unimaginable discoveries. But when dear Mom finds out her sons 
        are missing, she teams up with the legendary manticore to bring her beloved boys back home.<br/>
        —yusufpiskin</>)
      }
      else if(title=="Frozen II"){
        return (<>Anna, Elsa, Kristoff, Olaf and Sven leave Arendelle to travel to an ancient, 
        autumn-bound forest of an enchanted land. They set out to find the origin of Elsa's 
        powers in order to save their kingdom.<br/>—Seha<br/><br/>
        Having harnessed her ever-growing power after lifting the dreadful curse of the eternal
        winter in Frozen (2013), the beautiful conjurer of snow and ice, Queen Elsa, now rules 
        the peaceful kingdom of Arendelle, enjoying a happy life with her sister, Princess Anna. 
        However, a melodious voice that only Elsa can hear keeps her awake, inviting her to the 
        mystical enchanted forest that the sisters' father told them about a long time ago. 
        Now, unable to block the thrilling call of the secret siren, Elsa, along with Anna, 
        Kristoff, Olaf, and Sven summons up the courage to follow the voice into the unknown, 
        intent on finding answers in the perpetually misty realm in the woods. More and more, 
        an inexplicable imbalance is hurting not only her kingdom but also the neighboring 
        tribe of Northuldra. Can Queen Elsa put her legendary magical skills to good use to 
        restore peace and stability?<br/>—Nick Riganas</>)
      }
      else if(title=="Sonic the Hedgehog"){
        return (<>After discovering a small, blue, fast hedgehog, a small-town police officer 
        must help him defeat an evil genius who wants to do experiments on him.<br/><br/>
        Based on the global blockbuster videogame franchise from Sega, SONIC THE HEDGEHOG 
        tells the story of the world's speediest hedgehog as he embraces his new home on Earth. 
        In this live-action adventure comedy, Sonic and his new best friend Tom (James Marsden) 
        team up to defend the planet from the evil genius Dr. Robotnik (Jim Carrey) and his plans 
        for world domination. The family-friendly film also stars Tika Sumpter and Ben Schwartz 
          as the voice of Sonic.<br/>—Paramount Pictures<br/><br/></>)
      }
      else if(title=="Harley Quinn; Birds of Prey"){
        return (<>After splitting with the Joker, Harley Quinn joins superheroes Black Canary, 
        Huntress and Renee Montoya to save a young girl from an evil crime lord.<br/><br/>
        After her painful breakup with Joker, shortly after the battle with the Enchantress in 
        Suicide Squad (2016), the already unhinged and extremely volatile Harley Quinn finds 
        herself all alone. But, with her mentor out of the picture and a huge target on her back, 
        Harley locks horns with Gotham City's ruthless crime lord, Roman Sionis, who's trying to 
        track down a precious diamond and the audacious pickpocket, Cassandra Cain. Now, on the 
        hunt for the teen street hustler and the gemstone, Quinn crosses paths with singer, 
        Dinah Lance, Detective Renee Montoya, and a mysterious crossbow-wielding murderess who 
        are all also after the girl, as Roman's top assassin, Victor Zsasz, is bent on getting 
        Cain first. Can Harley take down the brutal super-villain known only as the Black Mask?
        <br/>—Nick Riganas<br/><br/></>)
      }
      else if(title=="Jumanji; The Next Level"){
        return (<>In Jumanji: The Next Level, the gang is back but the game has changed. As they 
        return to rescue one of their own, the players will have to brave parts unknown from arid 
        deserts to snowy mountains, to escape the world's most dangerous game.<br/>
        —Sony Pictures Entertainment<br/><br/>
        One quiet year after unearthing the old-school video-game console in Jumanji: Welcome 
        to the Jungle (2017), Spencer and his friends--Martha, Fridge, and Bethany--have all 
        gone their separate ways. However, the power of the mysterious board game is unlimited, 
        and before they know it, the quartet of reluctant players, along with a pair of unexpected 
        participants, find themselves, once again, pulled into the dangerous mystical realm. 
        This time, the game has evolved, and challenging new levels await the users' digital 
        alter egos, as a mighty adversary bent on destruction threatens Jumanji. Amid unforgiving 
        deserts, treacherous jungle oases, and steep snow-capped mountains will Dr Smoulder 
        Bravestone and the other characters figure out how to cooperate, and get out of there alive?
        <br/>—Nick Riganas</>)
      }
      else if(title=="Bad Boys For Life"){
        return (<>Miami detectives Mike Lowrey and Marcus Burnett must face off against a 
        mother-and-son pair of drug lords who wreak vengeful havoc on their city.<br/>—Sony Pictures
        <br/><br/>Marcus and Mike have to confront new issues (career changes and midlife crises), as 
        they join the newly created elite team AMMO of the Miami police department to take down 
        the ruthless Armando Armas, the vicious leader of a Miami drug cartel.</>)
      }
      else if(title=="The Call Of The Wild"){
        return (<>A sled dog struggles for survival in the wilds of the Yukon.<br/><br/>
        Story of a young dog, whose name is Buck. He is kidnapped from his owners home and is 
        forced to be a sled dog. On his journey he starts to find his true self, but that all 
        goes south when his new owner loses his job. Then, Buck goes and lives with someone and 
        they go on an adventure, where he meets a new species of dog. There he finds his real 
        purpose in life and realised what he is meant for.<br/><br/>
        The Call of the Wild is a vibrant story of Buck, a big and kindhearted dog, a crossbreed 
        between a St. Bernard and a Scotch Collie, whose carefree life of leisure was suddenly 
        upset when he was stolen from his home in Santa Clara County, California and deported up 
        north, to be sold in Skagway, Alaska, and taken further north, to Dawson City, Yukon, 
        during the late 1890s Klondike Gold Rush, when strong sled dogs were in high demand. 
        As a newcomer to the dog team delivery service - and not before long their front-runner 
        - Buck, a dog like no other, who had been spoiled, and who had suffered, but he could 
        not be broken, is having the time of his life. Forced to fight to survive, eventually 
        taken by his last owner, John Thornton, to proximity of the Arctic Circle, somewhere 
        between Yukon and Alaska, he progressively depends on his primal instincts, sheds the 
        comforts of civilization and responds to "the call of the wild", as master of his own.
        <br/>—Davor Blazevic 1959</>)
      }
    }

    toTime(a){
      a = a+ ""
      if(!a.includes("."))
        a=a+".0"

      let b = a.substring(a.indexOf(".")+1,a.length)
      if(b.length<2)
        b=b+"0"

      let c = a.substring(0,a.indexOf("."))
      if(c.length<2){
        c="0"+c
        b=b+"am"
      }
      else if((c*1)<=12){
        b=b+"am"
      }
      else if((c*1)>12){
        c=c-12
        c="0"+c
        b=b+"pm"
      }

      a=c+":"+b
      return a
    }

    render() { 
      return (
      <div>

      <div class="d-flex flex-row">
      <div class="p-2"><img src={require("./images/"+this.props.location.state.title+".jpg")}  /></div>
      <div class="align-self-center"> <span class="h5">{this.props.location.state.title}</span><br/>
      {this.props.location.state.genre}<br/>
      [{this.props.location.state.age}] - {this.props.location.state.length}<br/>
      {this.props.location.state.released}</div>
      <div class="p-2 w-50 ml-4"> <span class="h1 p-0"> Summaries  </span> (imbn.com) <br/>{this.text()}</div>
      </div>



<table className="table">

    <tbody>

    {this.state.days.map( days =>(
      <div>

      <>
      <tr >

      <td class="p-0">
      <img src={require("./images/"+days.movies_array.title+".jpg")}  alt="sonic"width="150"/>
      </td>


      <table className="table">

      <th class="pt-0 pb-0 bg-light" colspan="3">
      <span class="h4">{days.theater}</span>  <span class="h5"> ({days.address}) </span>   
      </th>

      <tr>

      <td width="30%">
      <span class="h4"> {days.movies_array.title}</span>
      <div>{days.movies_array.genre}</div>
      <div>[{days.movies_array.age}] - {days.movies_array.length}</div>
      <div>{days.movies_array.released}</div>
      </td>

      <td  width="40%">
      <div class="display-4 p-0 h2 mb-0 pl-4">
      {days.day}
      </div>



      {days.movies_array.times.map( time =>(

       <Link to={{
        pathname: 'purchase',
        state: { 
          title: days.movies_array.title,
          theater: days.theater,
           address: days.address,
              start: this.toTime(time.start),
              end: this.toTime(time.end),
              date: days.day


        }
      }}> <button class="btn btn-primary mt-1 mr-2" >{this.toTime(time.start)}-{this.toTime(time.end)}  </button> </Link>

      ))}


      </td>

      <td >
      <button type="button" class="btn btn-dark" 
      onClick={()=> window.open("https://www.amctheatres.com/", "_blank")}>Purchase with AMC</button>
      <br/>
      <button type="button" class="btn btn-secondary" 
      onClick={()=> window.open("https://www.regmovies.com/", "_blank")}>Purchase with Regal</button>
      </td>

      </tr>

      </table>

      </tr>
      <div class="bg-light pb-1"></div>
      </>


      </div>

      ))}

    </tbody>
    </table>


      </div>

      )
    }
  }
