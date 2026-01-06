"use client"

import {useState} from "react";
import {useRouter} from "next/navigation";
import styles from "./page.module.css";

export default function Home() {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const router = useRouter()

  async function buttonHandler(e) {
    e.preventDefault()
    console.log('Lade Autos…')
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/cars')
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
      const data = await res.json()
      console.log('Geladen:', data.length, 'Autos')
      setCars(data)
    } catch (err) {
      console.error('Fehler:', err)
      setError(err.message || 'Fehler beim Laden')
      setCars([])
    } finally {
      setLoading(false)
    }
  }

  function handleNewCar() {
    router.push('/carform')
  }

  return (
    <main className={styles.main}>
      <section className={styles.center}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Cool Cars — Übersicht</h1>
          <p className={styles.heroSubtitle}>Kleine Demo im Dark‑Mode. Lade deine Autos und füge neue hinzu.</p>
          <div className={styles.actions}>
            <button 
              type="button"
              className={styles.cta} 
              onClick={buttonHandler}
              disabled={loading}
            >
              {loading ? 'Lädt...' : 'Autos laden'}
            </button>
            <button 
              type="button"
              className={styles.cta} 
              onClick={handleNewCar}
            >
              Neues Auto
            </button>
          </div>
        </div>
      </section>

      <section className={styles.content}>
        {error && <div className={styles.card}><p className={styles.empty}>Fehler: {error}</p></div>}

        {cars.length === 0 ? (
          <div className={styles.card}>
            <p className={styles.empty}>{loading ? 'Lädt…' : 'Noch keine Autos geladen. Klicke auf „Autos laden“. '}</p>
          </div>
        ) : (
          <ul className={styles.carsList}>
            {cars.map(car => (
              <li key={car.id} className={styles.carItem}>
                <div className={styles.card}>
                  <h3>{car.brand} {car.model}</h3>
                  <p>{car.horsePower} PS • {car.year ?? '—'}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}
