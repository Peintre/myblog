import{h as q}from"./dayjs.9ba53914.js";const g=2147483647,l=36,A=1,m=26,B=38,N=700,k=72,j=128,D="-",U=/^xn--/,V=/[^\0-\x7E]/,P=/[\x2E\u3002\uFF0E\uFF61]/g,$={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},w=l-A,f=Math.floor,v=String.fromCharCode;function C(e){throw new RangeError($[e])}function z(e,o){const n=[];let t=e.length;for(;t--;)n[t]=o(e[t]);return n}function E(e,o){const n=e.split("@");let t="";n.length>1&&(t=n[0]+"@",e=n[1]),e=e.replace(P,".");const c=e.split("."),r=z(c,o).join(".");return t+r}function F(e){const o=[];let n=0;const t=e.length;for(;n<t;){const c=e.charCodeAt(n++);if(c>=55296&&c<=56319&&n<t){const r=e.charCodeAt(n++);(r&64512)==56320?o.push(((c&1023)<<10)+(r&1023)+65536):(o.push(c),n--)}else o.push(c)}return o}const O=e=>String.fromCodePoint(...e),R=function(e){return e-48<10?e-22:e-65<26?e-65:e-97<26?e-97:l},T=function(e,o){return e+22+75*(e<26)-((o!=0)<<5)},_=function(e,o,n){let t=0;for(e=n?f(e/N):e>>1,e+=f(e/o);e>w*m>>1;t+=l)e=f(e/w);return f(t+(w+1)*e/(e+B))},I=function(e){const o=[],n=e.length;let t=0,c=j,r=k,a=e.lastIndexOf(D);a<0&&(a=0);for(let s=0;s<a;++s)e.charCodeAt(s)>=128&&C("not-basic"),o.push(e.charCodeAt(s));for(let s=a>0?a+1:0;s<n;){let i=t;for(let u=1,d=l;;d+=l){s>=n&&C("invalid-input");const h=R(e.charCodeAt(s++));(h>=l||h>f((g-t)/u))&&C("overflow"),t+=h*u;const p=d<=r?A:d>=r+m?m:d-r;if(h<p)break;const b=l-p;u>f(g/b)&&C("overflow"),u*=b}const x=o.length+1;r=_(t-i,x,i==0),f(t/x)>g-c&&C("overflow"),c+=f(t/x),t%=x,o.splice(t++,0,c)}return String.fromCodePoint(...o)},S=function(e){const o=[];e=F(e);let n=e.length,t=j,c=0,r=k;for(const i of e)i<128&&o.push(v(i));let a=o.length,s=a;for(a&&o.push(D);s<n;){let i=g;for(const u of e)u>=t&&u<i&&(i=u);const x=s+1;i-t>f((g-c)/x)&&C("overflow"),c+=(i-t)*x,t=i;for(const u of e)if(u<t&&++c>g&&C("overflow"),u==t){let d=c;for(let h=l;;h+=l){const p=h<=r?A:h>=r+m?m:h-r;if(d<p)break;const b=d-p,M=l-p;o.push(v(T(p+b%M,0))),d=f(b/M)}o.push(v(T(d,0))),r=_(c,x,s==a),c=0,++s}++c,++t}return o.join("")},y=function(e){return E(e,function(o){return U.test(o)?I(o.slice(4).toLowerCase()):o})},L=function(e){return E(e,function(o){return V.test(o)?"xn--"+S(o):o})},G={version:"2.1.0",ucs2:{decode:F,encode:O},decode:I,encode:S,toASCII:L,toUnicode:y};var H=Object.freeze(Object.defineProperty({__proto__:null,ucs2decode:F,ucs2encode:O,decode:I,encode:S,toASCII:L,toUnicode:y,default:G},Symbol.toStringTag,{value:"Module"})),K=q(H);export{K as r};