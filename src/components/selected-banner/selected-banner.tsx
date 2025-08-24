import { useAppDispatch, useAppSelector } from '@hooks/UseSelect';
import { clearSelected } from '@store/selectedPokemon';
import styles from './selected-banner.module.css';

export function SelectedBanner() {
  const dispatch = useAppDispatch();
  const selected = useAppSelector(state => state.selected.selected);
  const selectedList = Object.values(selected);

  const handleClear = () => {
    dispatch(clearSelected());
  };

  const handleDownload = () => {
    const headers = ['Name', 'Types', 'Abilities', 'Height', 'Weight'];
    const rows = selectedList.map(pokemon => [
      pokemon.name,
      pokemon.types?.map(t => t.type.name).join(', ') || 'Unknown',
      pokemon.abilities?.map(a => a.ability.name).join(', ') || 'None',
      pokemon.height,
      pokemon.weight,
    ]);

    const csvContent = [headers, ...rows]
      .map(row =>
        row
          .map(String)
          .map(v => `"${v}"`)
          .join(','),
      )
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${selectedList.length}_items.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (selectedList.length === 0) return null;

  return (
    <div className={styles.banner}>
      <p>{selectedList.length} Pokémon selected</p>
      <button className={styles.clearBtn} type="button" onClick={handleClear}>
        Unselect all
      </button>
      <button type="button" onClick={handleDownload} className={styles.downloadBtn}>
        Download
      </button>
    </div>
  );
}
