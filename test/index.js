import { expect } from 'chai';

const marketData = `
currencyPair price   changeAbsolute changePercent
EUR/USD     1.0735         -0.0045     -0.42
USD/JPY   112.0900          -0.494     -0.44
GBP/USD     1.2476         -0.0010     -0.08
AUD/USD     0.7648         -0.0032     -0.42
USD/CAD     1.3112          0.0092      0.71
USD/CHF     0.9927          0.0007      0.07
USD/CNY     6.8599         -0.0050     -0.07
EUR/JPY   120.3150         -1.1050     -0.91
EUR/GBP     0.8604         -0.0032     -0.37
`;

const parse = (data) => {
  const [header,...lines] = data.split('\n').filter(l => !!l);
  const parseLine = l => l.split(' ').filter(d => !!d);
  const keys = parseLine(header);
  const parseFloatIfNeed = (c,i)=> (i !==0 ? +c:c);
  
  const lineToObject = l=>l.reduce(
    (acc,c,i)=>({...acc,[keys[i]]:parseFloatIfNeed(c,i)}),
              {}
              );
  const parsed = lines
                      .map(parseLine)
                      .map(lineToObject);

  return parsed;
};

describe('test suite', () => {
  it('data is parsed correctly', () => {

    const data = parse(marketData);


    console.log(JSON.stringify(data, null, 2));

    expect(data.length).to.equal(9);


    const [eurUsd] = data;
    expect(eurUsd).to.deep.equal({
      currencyPair: 'EUR/USD',
      price: 1.0735,
      changeAbsolute: -0.0045,
      changePercent: -0.42,
    });
  });
});
