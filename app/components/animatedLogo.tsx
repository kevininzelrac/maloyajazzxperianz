export default function AnimatedLogo({ scroll }: { scroll: number }) {
  const M = { x: 67, y: 20, h: 2.9 };
  const J = { x: 77, y: 54, h: 2.9 };
  const X = { x: 12, y: 89, h: 2.9 };
  const hyphen = { x: 44, y: 32, h: 2.9 };

  const translate = (data = { x: 77, y: 54 }) => {
    let formula = (max: number) =>
      Math.max(-max, 1 - (scroll / 360) * max).toFixed(2);
    return `translate(${formula(data.x)}px, ${formula(data.y)}px)`;
  };
  const scale = (min = { h: 1 }) =>
    `scale(${Math.min(min.h, 1 + (scroll / 400) * 2).toFixed(2)}) `;

  const opacity = Math.max(0, 1 - (scroll / 150) * 1);
  const svgHeight = Math.max(36, 400 - scroll) + "px";

  return (
    <svg
      version="1.1"
      id="Calque_1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 161.9996796 161.9996796"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 2,
        height: svgHeight,
        alignSelf: "flex-start",
      }}
    >
      <path
        style={{
          transform: scale(M) + translate(M),
        }}
        className="M"
        fill="currentColor"
        d="M80.5810165,60.8510323v-8.7651367c0-3.4379883,0-6.9140625,0.1508789-10.3520508
			c-0.3022461,3.4379883-0.8310547,7.3671875-2.1533203,19.1171875h-3.4760742l-2.1533203-19.6835938
			c0.1508789,3.6269531,0.2265625,7.2915039,0.2265625,10.9560547v8.7275391h-3.7402344v-31.09375h5.4404297
			c1.5112305,16.7749023,1.7758789,19.2304688,1.9267578,21.6484375c0.1513672-2.4179688,0.3398438-4.9868164,2.0024414-21.6484375
			h5.5161133v31.09375H80.5810165z"
      />
      <path
        className="a"
        style={{
          transform: scale() + translate(),
          opacity: opacity,
        }}
        fill="currentColor"
        d="M94.5946884,60.8510323l-0.453125-4.4204102h-3.0224609l-0.5292969,4.4204102h-3.9667969
			l3.7783203-31.09375h4.7597656l3.5517578,31.09375H94.5946884z M93.6884384,52.6903877
			c-0.4160156-4.0805664-0.7558594-8.1230469-1.0585938-12.3920898c-0.3017578,4.269043-0.6796875,8.387207-1.1328125,12.3920898
			H93.6884384z"
      />
      <path
        className="l"
        style={{
          transform: scale() + translate(),
          opacity: opacity,
        }}
        fill="currentColor"
        d="M101.1288681,60.8510323v-31.09375h4.1181641v26.9755859h4.6083984v4.1181641H101.1288681z"
      />
      <path
        className="o"
        style={{
          transform: scale() + translate(),
          opacity: opacity,
        }}
        fill="currentColor"
        d="M111.6679306,34.706501c0-3.5131836,1.7001953-5.2890625,5.0625-5.2890625
			s5.0625,1.7758789,5.0625,5.2890625v21.1953125c0,3.5136719-1.7001953,5.2890625-5.0625,5.2890625
			s-5.0625-1.7753906-5.0625-5.2890625V34.706501z M117.6747665,34.706501c0-0.7929688-0.3017578-1.1708984-0.9443359-1.1708984
			s-0.9443359,0.3779297-0.9443359,1.1708984v21.1953125c0,0.793457,0.3017578,1.1708984,0.9443359,1.1708984
			s0.9443359-0.3774414,0.9443359-1.1708984V34.706501z"
      />
      <path
        className="y"
        style={{
          transform: scale() + translate(),
          opacity: opacity,
        }}
        fill="currentColor"
        d="M127.1562119,60.8510323V47.5898018l-3.9667969-17.8325195h4.3447266
			c1.322258,7.6699219,1.5869064,9.7099609,1.8886642,11.7875977c0.3027344-2.0776367,0.6044922-4.1176758,2.0029297-11.7875977
			h4.0048828l-4.1181641,17.8325195v13.2612305H127.1562119z"
      />
      <path
        className="a"
        style={{
          transform: scale() + translate(),
          opacity: opacity,
        }}
        fill="currentColor"
        d="M142.8339386,60.8510323l-0.453125-4.4204102h-3.0224609l-0.5292969,4.4204102h-3.9667969
			l3.7783203-31.09375h4.7597656l3.5517578,31.09375H142.8339386z M141.9276886,52.6903877
			c-0.4160156-4.0805664-0.7558594-8.1230469-1.0585938-12.3920898c-0.3017578,4.269043-0.6796875,8.387207-1.1328125,12.3920898
			H141.9276886z"
      />
      <path
        className="J"
        style={{
          transform: scale(J) + translate(J),
        }}
        fill="currentColor"
        d="M101.4306259,91.3085556c0.4160156,0.0761719,0.9443359,0.1132812,1.625,0.1132812
			c0.6796875,0,1.0195312-0.453125,1.0195312-1.359375V64.2572861h4.1181641v25.8051758
			c0,3.8154297-1.7753906,5.515625-5.1376953,5.515625c-0.6044922,0-1.1337891-0.0751953-1.625-0.1894531V91.3085556z"
      />
      <path
        className="a"
        style={{
          transform: scale() + translate(),
          opacity: opacity,
        }}
        fill="currentColor"
        d="M117.9023056,95.3515244l-0.453125-4.4208984h-3.0224609l-0.5292969,4.4208984h-3.9667969
			l3.7783203-31.0942383h4.7597656l3.5517578,31.0942383H117.9023056z M116.9960556,87.1903915
			c-0.4160156-4.0800781-0.7558594-8.1230469-1.0585938-12.3920898c-0.3017578,4.269043-0.6796875,8.387207-1.1328125,12.3920898
			H116.9960556z"
      />
      <path
        className="z"
        style={{
          transform: scale() + translate(),
          opacity: opacity,
        }}
        fill="currentColor"
        d="M123.9823837,95.3515244v-4.1943359l6.0078049-22.8950195h-5.7050705v-4.0048828h9.7851486
			v3.7026367l-5.8183594,23.1972656h5.8183594v4.1943359H123.9823837z"
      />
      <path
        className="z"
        style={{
          transform: scale() + translate(),
          opacity: opacity,
        }}
        fill="currentColor"
        d="M136.4481964,95.3515244v-4.1943359l6.0078125-22.8950195h-5.7050781v-4.0048828h9.7851562
			v3.7026367l-5.8183594,23.1972656h5.8183594v4.1943359H136.4481964z"
      />
      <path
        className="X"
        style={{
          transform: scale(X) + translate(X),
        }}
        fill="currentColor"
        d="M57.1972237,129.8515167c-1.3974609-7.5185471-1.8134766-9.9736252-2.1157227-12.4296799
			c-0.3022461,2.4560547-0.6044922,4.8359375-2.1157227,12.4296799H48.772419l4.0048828-16.6611252l-3.2871094-14.4326172h4.3823242
			c1.0200195,5.7431641,1.2089844,7.8583984,1.3979492,9.7851562c0.1889648-1.9638672,0.4912109-3.9287109,1.3979492-9.7851562
			h4.269043l-3.4379883,14.3193359l4.1181641,16.7744064H57.1972237z"
      />
      <path
        className="p"
        style={{
          transform: scale() + translate(),
          opacity: opacity,
        }}
        fill="currentColor"
        d="M63.7314034,129.8515167V98.7577744h5.0249062c3.777832,0,5.4780273,1.7001953,5.4780273,5.6298828
			v5.0996094c0,3.9296875-1.6621094,5.5917969-5.4404297,5.5917969h-0.9443359v14.7724533H63.7314034z M70.1918564,104.3495712
			c0-0.9824219-0.4912109-1.4736328-1.4355469-1.4736328h-0.9067383v8.1982422h0.9443359
			c0.9443359,0,1.3979492-0.4912109,1.3979492-1.4355469V104.3495712z"
      />
      <path
        className="e"
        style={{
          transform: scale() + translate(),
          opacity: opacity,
        }}
        fill="currentColor"
        d="M76.764122,129.8515167V98.7577744h8.5385742v4.1181641h-4.4204102v9.0673828h2.7954102v4.1181641
			h-2.7954102v9.671875h4.6088867v4.1181564H76.764122z"
      />
      <path
        className="r"
        style={{
          transform: scale() + translate(),
          opacity: opacity,
        }}
        fill="currentColor"
        d="M94.4062119,129.8515167c-0.4160156-4.6845627-0.8320312-9.1806564-1.4365234-13.8652267
			h-0.6796875v13.8652267h-4.1181641V98.7577744h4.9121094c3.7773438,0,5.5537109,1.5117188,5.5537109,5.5917969v6.4228516
			c0,2.4179688-0.5292969,3.6269531-1.7763672,4.3828125c0.7939453,4.9863281,1.4355469,9.8222656,2.0400391,14.6962814H94.4062119z
			 M94.4814072,104.3495712c0-0.9824219-0.453125-1.4736328-1.3974609-1.4736328h-0.7939453v9.3701172h0.8310547
			c0.9072266,0,1.3603516-0.4912109,1.3603516-1.4365234V104.3495712z"
      />
      <path
        className="i"
        style={{
          transform: scale() + translate(),
          opacity: opacity,
        }}
        fill="currentColor"
        d="M101.5819931,129.8515167V98.7577744h4.1181641v31.0937424H101.5819931z"
      />
      <path
        className="a"
        style={{
          transform: scale() + translate(),
          opacity: opacity,
        }}
        fill="currentColor"
        d="M116.126915,129.8515167l-0.453125-4.4199142h-3.0224609l-0.5292969,4.4199142h-3.9667969
			l3.7783203-31.0937424h4.7597656l3.5517578,31.0937424H116.126915z M115.220665,121.6903915
			c-0.4160156-4.0800781-0.7558594-8.1220703-1.0585938-12.3916016c-0.3017578,4.2695312-0.6796875,8.3876953-1.1328125,12.3916016
			H115.220665z"
      />
      <path
        className="n"
        style={{
          transform: scale() + translate(),
          opacity: opacity,
        }}
        fill="currentColor"
        d="M129.7255402,129.8515167c-2.5312424-12.0146408-3.2109299-15.5654221-3.8154221-19.0419846
			c0.1132812,3.6650391,0.1132812,7.2539062,0.1132812,11.0322266v8.009758h-3.4384766V98.7577744h4.7226562
			c2.1162033,13.1103516,2.5312424,16.2460938,3.0224533,19.4570312c-0.1132812-3.3242188-0.1132812-6.5361328-0.1132812-9.7470703
			v-9.7099609h3.4384766v31.0937424H129.7255402z"
      />
      <path
        className="z"
        style={{
          transform: scale() + translate(),
          opacity: opacity,
        }}
        fill="currentColor"
        d="M136.4481964,129.8515167v-4.1933517l6.0078125-22.8955078h-5.7050781v-4.0048828h9.7851562
			v3.703125l-5.8183594,23.1972656h5.8183594v4.1933517H136.4481964z"
      />
      <path
        className="hyphen"
        style={{
          transform: scale(hyphen) + translate(hyphen),
        }}
        fill="currentColor"
        d="M49.6415596,79.6891632h40.5938301v4.4044189H49.6415596V79.6891632z"
      />
    </svg>
  );
}
