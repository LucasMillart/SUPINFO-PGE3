const fs = require('fs').promises;
const path = require('path');

const hitsFile = path.join(__dirname, '../data/hits.json');

async function readHits()
{
  try
  {
    const data = await fs.readFile(hitsFile, 'utf8');
    return JSON.parse(data);
  } catch (error)
  {
    return { hits: {} };
  }
}

async function writeHits(hits)
{
  await fs.writeFile(hitsFile, JSON.stringify(hits, null, 2));
}

const hitCounter = async (req, res, next) =>
{
  try
  {
    const hits = await readHits();
    const path = `${req.method} ${req.path}`;
    hits.hits[path] = (hits.hits[path] || 0) + 1;
    await writeHits(hits);
    next();
  } catch (error)
  {
    next(error);
  }
};

module.exports = hitCounter;