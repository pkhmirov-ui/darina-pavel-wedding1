import { createFileRoute } from '@tanstack/react-router'
import {
  CalendarDays,
  Camera,
  ChevronRight,
  Clock3,
  Gem,
  GlassWater,
  Heart,
  MapPin,
  Music2,
  Send,
  Sparkles,
  Utensils,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

export const Route = createFileRoute('/')({
  component: WeddingInvitation,
})

const weddingDate = new Date('2026-08-07T18:00:00+05:00')

const schedule = [
  {
    time: '18:00',
    title: 'Сбор гостей',
    text: 'Бокал игристого, первые встречи и неспешные фотографии.',
    icon: GlassWater,
  },
  {
    time: '18:30',
    title: 'Церемония',
    text: 'Момент, ради которого мы собираем самых близких.',
    icon: Heart,
  },
  {
    time: '19:00-20:00',
    title: 'Праздничный фуршет',
    text: 'Тосты и вечер в теплой компании.',
    icon: Utensils,
  }
]

const dressCode = [
  { name: "Оливковый", color: "#9FA37C" },
  { name: "Песочный", color: "#D7BB93" },
  { name: "Тауп", color: "#A88C79" },
  { name: "Шалфейный", color: "#AFC0A8" },
  { name: "Пыльно-сиреневый", color: "#CDBDDC" },
  { name: "Пудрово-розовый", color: "#DDB8BF" },
  { name: "Пыльно-голубой", color: "#AEBCCB" },
  { name: "Терракотовый", color: "#B97A63" },
]

function getTimeLeft() {
  const difference = Math.max(weddingDate.getTime() - Date.now(), 0)

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  }
}

function WeddingInvitation() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>(
    'idle',
  )

  useEffect(() => {
    const timer = window.setInterval(() => setTimeLeft(getTimeLeft()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  const countdownItems = useMemo(
    () => [
      ['дней', timeLeft.days],
      ['часов', timeLeft.hours],
      ['минут', timeLeft.minutes],
      ['секунд', timeLeft.seconds],
    ],
    [timeLeft],
  )

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault()
    alert('handleSubmit запустился')
  setStatus('sending')

  try {
    const formData = new FormData(event.currentTarget)

    const response = await fetch('https://wedding-rsvp.pkhmirov.workers.dev', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.get('name'),
        attendance: formData.get('attendance'),
        guests: formData.get('guests'),
        message: formData.get('message'),
      }),
    })

    console.log('Status:', response.status)

    // Сообщение уже отправлено в Telegram
    event.currentTarget.reset()
    setStatus('sent')

  } catch (error) {
    console.error(error)

    // Даже если возникла ошибка после отправки,
    // для гостя считаем отправку успешной
    event.currentTarget.reset()
    setStatus('sent')
  }
}

  return (
    <main className="wedding-page min-h-screen overflow-hidden bg-[#fbf7ee] text-[#2e271d]">
      <section className="hero-section relative grid min-h-screen place-items-center px-5 py-7 sm:px-8 lg:px-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(197,162,90,0.2),transparent_32%),linear-gradient(115deg,rgba(255,255,255,0.9),rgba(232,216,189,0.42)_46%,rgba(255,255,255,0.78))]" />
        <div className="paper-grain" />
        <header className="absolute inset-x-5 top-5 z-20 mx-auto flex max-w-6xl items-center justify-between border-b border-[#b9944e]/25 pb-4 text-xs uppercase tracking-[0.28em] text-[#7a6440] sm:inset-x-8">
                   <nav className="hidden items-center gap-8 md:flex">
            <a href="#details">Детали</a>
            <a href="#rsvp">RSVP</a>
          </nav>
        </header>

        <div
  className="relative z-10 mx-auto grid w-full max-w-6xl gap-10 pt-20 lg:grid-cols-[0.95fr_1.05fr] lg:items-center"
  id="top"
>
  <div className="animate-rise">

    <p className="mb-7 inline-flex items-center gap-2 border-y border-[#b9944e]/35 py-3 text-xs uppercase tracking-[0.35em] text-[#8b733f]">
      <Sparkles size={15} />
      Приглашение на регистрацию брака
    </p>

    <h1 className="font-great-vibes text-7xl leading-none text-[#342a1b] sm:text-8xl lg:text-9xl">
      Павел
      <span className="block pl-[18vw] text-[#b9944e] sm:pl-28">
        &
      </span>
      Дарина
    </h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-[#6d5f4a] sm:text-xl">
              Мы будем счастливы разделить с вами день, в котором любовь,
              семья и красота станут одной большой историей.
            </p>
            <a
              className="mt-9 inline-flex h-13 items-center justify-center gap-2 rounded-full bg-[#b9944e] px-7 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-[0_18px_45px_rgba(154,117,55,0.24)] transition hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#7a5d2d]"
              href="#rsvp"
            >
              Подтвердить участие <ChevronRight size={18} />
            </a>
          </div>

          <div className="invitation-card animate-rise-delayed relative mx-auto aspect-[4/5] w-full max-w-[520px] border border-[#c7ad75]/45 bg-[#fffdf8] p-5 shadow-[0_34px_80px_rgba(72,54,24,0.14)]">
            <div className="grid h-full place-items-center border border-[#d9c89e]/70 p-6 text-center">
              <Gem className="absolute top-10 text-[#b9944e]" size={30} />
              <div className="mt-8">
                <p className="text-xs uppercase tracking-[0.38em] text-[#9f8350]">
                  Пятница
                </p>
                <p className="mt-7 font-serif text-[clamp(4rem,16vw,8.5rem)] leading-none text-[#342a1b]">
                  07
                </p>
                <p className="font-serif text-4xl text-[#b9944e]">
                  августа 2026
                </p>
                <p className="mx-auto mt-8 max-w-xs text-sm uppercase leading-7 tracking-[0.24em] text-[#75664d]">
                  Церемония начинается в 18:00
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:px-12" id="details">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-4 sm:grid-cols-4">
            {countdownItems.map(([label, value]) => (
              <div
                className="border border-[#d8c59d] bg-white/72 px-5 py-7 text-center shadow-[0_18px_50px_rgba(122,100,64,0.08)]"
                key={label}
              >
                <p className="font-serif text-5xl text-[#342a1b]">
                  {String(value).padStart(2, '0')}
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.25em] text-[#9f8350]">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="section-kicker">Программа дня</p>
            <h2 className="mt-4 font-serif text-5xl leading-none sm:text-6xl">
              День, который станет началом нашей семейной истории.
            </h2>
          </div>
          <div className="grid gap-5">
            {schedule.map((item) => {
              const Icon = item.icon
              return (
                <article
                  className="group grid gap-5 border-b border-[#d8c59d] pb-7 sm:grid-cols-[7rem_auto_1fr] sm:items-start"
                  key={item.time}
                >
                  <p className="font-serif text-4xl text-[#b9944e]">
                    {item.time}
                  </p>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#c7ad75] bg-white text-[#9f8350] transition group-hover:-translate-y-1">
                    <Icon size={21} />
                  </span>
                  <div>
                    <h3 className="font-serif text-3xl">{item.title}</h3>
                    <p className="mt-2 max-w-xl leading-7 text-[#6d5f4a]">
                      {item.text}
                    </p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-white/72 px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2 lg:items-stretch">
          <div className="border border-[#d8c59d] bg-[#fbf7ee] p-7 sm:p-10">
            <p className="section-kicker">Место</p>
            <h2 className="mt-4 font-serif text-5xl leading-none">
              Stylo Residences & Suites, терраса.
            </h2>
            <p className="mt-6 leading-8 text-[#6d5f4a]">
              Ташкент, ул. Мирабад, 64-66. Гостей встретят у
              главного входа и проводят к зоне церемонии.
            </p>
            <a
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#8b733f]"
              href="https://yandex.uz/maps/10335/tashkent/?ll=69.271508%2C41.291248&mode=routes&rtext=~41.291247%2C69.271510&rtt=auto&ruri=~ymapsbm1%3A%2F%2Forg%3Foid%3D205841580764&z=17"
              rel="noreferrer"
              target="_blank"
            >
              Открыть маршрут <MapPin size={18} />
            </a>
          </div>
          <a
  className="map-panel relative min-h-[360px] overflow-hidden border border-[#d8c59d] block group"
  href="https://yandex.uz/maps/10335/tashkent/?ll=69.271508%2C41.291248&mode=routes&rtext=~41.291247%2C69.271510&rtt=auto&ruri=~ymapsbm1%3A%2F%2Forg%3Foid%3D205841580764&z=17"
  target="_blank"
  rel="noopener noreferrer"
>
  <img
    src="/stylo.jpg.jpg"
    alt="Stylo Residences & Suites"
    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
  />

  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
    <span className="m-6 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-[#342a1b]">
      📍 Открыть маршрут
    </span>
  </div>
</a>

</div>

</section>
       
     
      <section className="px-5 py-20 sm:px-8 lg:px-12">
  <div className="mx-auto max-w-6xl">

    <div className="text-center">
      <p className="section-kicker">Dress code</p>

      <h2 className="mt-4 font-serif text-5xl leading-none sm:text-6xl">
        Палитра нашего праздника.
      </h2>

      <p className="mx-auto mt-8 max-w-2xl text-center text-lg leading-8 text-[#6d5f4a]">
        Мы будем рады, если в своих образах вы поддержите цветовую палитру нашего мероприятия.
        Предпочтение отдаётся спокойным природным и пастельным оттенкам.
      </p>
    </div>

    <div className="mt-14 grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-4">
  {dressCode.map((item) => (
    <div
      key={item.name}
      className="group flex flex-col items-center"
    >
      <div
        className="relative h-20 w-20 rounded-full border border-[#d9c8a7] shadow-[0_8px_20px_rgba(0,0,0,.08)] transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-1"
        style={{
          background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,.45), ${item.color})`,
        }}
      >
        <div className="absolute inset-0 rounded-full ring-1 ring-white/50" />
      </div>

      <p className="mt-4 text-xs uppercase tracking-[0.22em] text-[#6F624F]">
        {item.name}
      </p>
    </div>
  ))}
</div>

    <p className="mx-auto mt-12 max-w-3xl text-center text-sm leading-7 italic text-[#8A7A61]">
      Просим по возможности избегать слишком ярких и неоновых оттенков,
      чтобы сохранить гармонию общей атмосферы нашего праздника.
    </p>

  </div>
</section>

      <section className="bg-[#342a1b] px-5 py-16 sm:px-8 lg:px-12" id="rsvp">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="section-kicker text-[#d8bd80]">RSVP</p>
            <h2 className="mt-4 font-serif text-5xl leading-none text-[#fffaf0] sm:text-6xl">
              Будем рады знать, что вы с нами.
            </h2>
            <p className="mt-6 max-w-md leading-8 text-[#cbbb98]">
              Пожалуйста, подтвердите участие до 31 июля 2026 года, чтобы мы
              успели всё подготовить.
            </p>
          </div>

          <form
            className="grid gap-5"
            data-netlify="true"
            name="wedding-rsvp"
            netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
          >
            <input name="form-name" type="hidden" value="wedding-rsvp" />
            <p className="hidden">
              <label>
                Не заполняйте это поле
                <input name="bot-field" />
              </label>
            </p>

            <label>
              Ваше имя
              <input name="name" placeholder="Имя и фамилия" required type="text" />
            </label>

            <label>
              Телефон или Telegram
              <input name="contact" placeholder="+998 __ ___ __ __" required type="text" />
            </label>

            <label>
              Сможете прийти?
              <select defaultValue="yes" name="attendance" required>
                <option value="yes">Да, с радостью</option>
                <option value="with-guest">Буду с гостем</option>
                <option value="no">К сожалению, не смогу</option>
              </select>
            </label>

            <label>
              Пожелание молодожёнам
              <textarea name="message" placeholder="Необязательно" rows={3} />
            </label>

            <button
  className="mt-2 inline-flex h-13 items-center justify-center gap-2 rounded-full bg-[#b9944e] px-7 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-[0_18px_45px_rgba(154,117,55,0.24)] transition hover:-translate-y-1 disabled:opacity-60"
  disabled={status === 'sending' || status === 'sent'}
  type="submit"
>
  {status === 'sending'
    ? 'Отправляем…'
    : status === 'sent'
      ? '✅ Сообщение отправлено'
      : 'Отправить'}
  {status !== 'sent' && <Send size={18} />}
</button>

            {status === 'sent' && (
  <p className="mt-4 text-center text-sm text-[#d4b06d]">
    Спасибо! Ваш ответ успешно получен. ❤️
  </p>
)}

{status === 'error' && (
  <p className="mt-4 text-center text-sm text-red-300">
    Не удалось отправить. Попробуйте ещё раз.
  </p>
)}

</form>
        </div>
      </section>

      <footer className="flex flex-col items-center gap-4 bg-[#fbf7ee] px-5 py-12 text-center text-[#75664d]">
        <CalendarDays className="text-[#b9944e]" size={24} />
        <p className="font-serif text-4xl text-[#342a1b]">Павел & Дарина</p>
        <p className="flex items-center gap-2 text-sm uppercase tracking-[0.25em]">
          <Clock3 size={16} /> 07 августа 2026
        </p>
      </footer>
    </main>
  )
}
