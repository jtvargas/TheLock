import { PlayScene } from '@src/types/gameState';

function formatNumberWithCommas(num: string | number) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const getAverageTimeSpent = (scenes: PlayScene[]): string => {
  let totalSeconds = 0;
  let competitiveCount = 0;

  scenes.forEach(scene => {
    if (scene.gameMode === 'COMPETITIVE') {
      const { timeLapsed } = scene.meta;
      const [hours, minutes, seconds] = timeLapsed.split(':').map(Number);
      totalSeconds += hours * 3600 + minutes * 60 + seconds;
      competitiveCount += 1;
    }
  });

  if (!competitiveCount) return '00:00:00';

  const averageSeconds = totalSeconds / competitiveCount;
  const hours = Math.floor(averageSeconds / 3600);
  const minutes = Math.floor((averageSeconds - hours * 3600) / 60);
  const seconds = averageSeconds - hours * 3600 - minutes * 60;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
    2,
    '0',
  )}:${String(Math.round(seconds)).padStart(2, '0')}`;
};

export default { formatNumberWithCommas, getAverageTimeSpent };
