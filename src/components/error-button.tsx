'use client';

import { useState } from 'react';

export function ErrorButton() {
  const [hasError, setHasError] = useState(false);

  const throwError = () => {
    setHasError(true);
  };

  if (hasError) {
    throw new Error('The button throw an error');
  }

  return (
    <button className="errorButton button" type="button" onClick={throwError}>
      Go Error
    </button>
  );
}
