import{s as k,w as b,x as w,y as _,z as S,A as d}from"../chunks/scheduler.oCwEqdrh.js";import{S as y,i as j,a as J,t as q}from"../chunks/index.BKcCV9hI.js";import{w as p}from"../chunks/index.fzDGVWq1.js";const v=!0,H=Object.freeze(Object.defineProperty({__proto__:null,prerender:v},Symbol.toStringTag,{value:"Module"})),P=[{id:"anklehops",name:"Ankle Hops",description:"Hops from toes; calf raise then hop",categories:["legs"]},{id:"bearcrawl",name:"Bear Crawl",description:"",categories:["core","arms"]},{id:"birddogs",name:"Bird Dogs",description:"With hands and knees on floor, hold one leg up and straight with alterating arm out",categories:["core"]},{id:"burpees",name:"Burpees",description:"",categories:["core","arms","legs"]},{id:"calfraises",name:"Calf Raises",description:"",categories:["legs"]},{id:"crunches",name:"Crunches",description:"",categories:["core"]},{id:"firehydrants",name:"Fire Hydrants",description:"On hands and knees, raise one leg to the side 90 degrees",categories:["core"]},{id:"forwardlunge",name:"Forward Lunge",description:"",categories:["legs"]},{id:"fullsitup",name:"Full Sit Ups",description:"Lying on back, sit up and touch toes",categories:["core"]},{id:"heeltouches",name:"Heel Touches",description:"In sit up position, alternate side to side touching heels",categories:["core"]},{id:"highkneesrun",name:"High Knees Run",description:"Run in place bringing knees up 90 degrees",categories:["cardio"]},{id:"hollowbodyrock",name:"Hollow Body Rock",description:"On back, lift feet and arms and head off the floor, hold and rock back and forth",categories:["core"]},{id:"hurdles",name:"Hurdles",description:"Standing, feet together, bring knee up and over an imaginary hurdle, tap floor, then return",categories:["legs"]},{id:"jumprope",name:"Jump Rope",description:"Jump in place with an invisible jump rope",categories:["cardio"]},{id:"jumpingjacks",name:"Jumping Jacks",description:"",categories:["cardio"]},{id:"jumpingsplitsquat",name:"Jumping Split Squat",description:"In lunge position, jump up, then return",categories:["core","legs","cardio"]},{id:"longjumpjogback",name:"Long Jump With Jog Back",description:"From standing, jump forward, then tiny steps jog back",categories:["cardio"]},{id:"marchsteps",name:"March Steps",description:"",categories:["cardio"]},{id:"plankjacks",name:"Plank Jacks",description:"Bring legs in and out while in a plank",categories:["core","legs"]},{id:"punches",name:"Punches",description:"",categories:["arms"]},{id:"push-upsdiamond",name:"Push-Ups: Diamond",description:"Push ups with hands touching",categories:["core","arms"]},{id:"push-upswidestance",name:"Push-Ups: Widestance",description:"Push ups with wide arm stance",categories:["core","arms"]},{id:"raisedlegplank",name:"Raised Leg Plank",description:"In plank position, hold one leg up",categories:["core"]},{id:"reverselunge",name:"Reverse Lunge",description:"",categories:["legs"]},{id:"russiantwists",name:"Russian Twists",description:"",categories:["core"]},{id:"sidecrunch",name:"Side Crunch",description:"",categories:["core"]},{id:"sideplanks",name:"Side Planks",description:"",categories:["core"]},{id:"situps",name:"Sit Ups",description:"",categories:["core"]},{id:"skippinginplace",name:"Skipping In Place",description:"",categories:["cardio"]},{id:"squats",name:"Squats",description:"",categories:["legs"]},{id:"sumosquat",name:"Sumo Squat",description:"Wide leg squat, hands touch ground",categories:["legs"]},{id:"swimmer",name:"Swimmer",description:"On stomach, alternate hands and legs tapping ground",categories:["core","arms","legs"]},{id:"verticaljumps",name:"Vertical Jumps",description:"Jump as high as possible, arms up",categories:["legs"]},{id:"wallsquat",name:"Wall Squat",description:"",categories:["legs"]}];function L(o){let a;const l=o[1].default,s=b(l,o,o[0],null);return{c(){s&&s.c()},l(e){s&&s.l(e)},m(e,c){s&&s.m(e,c),a=!0},p(e,[c]){s&&s.p&&(!a||c&1)&&w(s,l,e,e[0],a?S(l,e[0],c,null):_(e[0]),null)},i(e){a||(J(s,e),a=!0)},o(e){q(s,e),a=!1},d(e){s&&s.d(e)}}}function O(o,a,l){let{$$slots:s={},$$scope:e}=a;const c=JSON.parse(JSON.stringify(P)).map(i=>({...i,selected:!1})),u=p(c),m={subscribe:u.subscribe,set:u.set,update:u.update,select:(i,t)=>{u.update(n=>{let g=n.findIndex(f=>f.id===i.id);return n[g].selected=t,n})},deselectAll:()=>{u.update(i=>i.map(t=>({...t,selected:!1})))}},r=p([]),h={subscribe:r.subscribe,set:r.set,update:r.update,add:i=>{r.update(t=>[...t,i])},remove:i=>{r.update(t=>{const n=t.findIndex(g=>g.id===i.id);return n>=0?t.toSpliced(n,1):t})},removeAll:()=>{r.update(()=>[])},swap:(i,t)=>{r.update(n=>(n.splice(t,0,n.splice(i,1)[0]),n))}};return d("exercises",m),d("selectedExercises",h),d("exerciseLength",p(45e3)),d("restLength",p(15e3)),d("repetitions",p(1)),d("setOrCycle",p("cycle")),o.$$set=i=>{"$$scope"in i&&l(0,e=i.$$scope)},[e,s]}class I extends y{constructor(a){super(),j(this,a,O,L,k,{})}}export{I as component,H as universal};
