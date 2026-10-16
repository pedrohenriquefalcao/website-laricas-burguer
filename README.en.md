<div align="center">

<img src="assets/icons/laricas-logo-png.png" alt="Larica's Burguer logo" width="120">

# 🍔 Larica's Burguer — Landing Page

**Landing page for _Larica's Burguer_, a fictional artisan burger joint in Salvador, Brazil.**

[🇧🇷 Português](README.md) · 🇺🇸 English

🔗 **[View the live site](https://laricasburguerunime.vercel.app/)**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Lottie](https://img.shields.io/badge/Lottie-00DDB5?logoColor=white)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)

</div>

---

## 📖 About

This is the landing page for **Larica's Burguer**, a **fictional** company created by a team of students at **UniAnhanguera** for a university project. The site presents the brand, its organizational culture, the team, and the menu.

In the project's universe, Larica's Burguer is an artisan burger restaurant in Salvador (Bahia, Brazil) with a **hybrid model**: dine-in runs from a kitchen in the **Rio Vermelho** neighborhood, while delivery (in-house and iFood) is handled by separate **Dark Kitchens** spread across the city, keeping both channels fast and high quality.

> ⚠️ **Academic project**, built for educational purposes with no commercial intent. The company, menu, prices, and contact details are fictional.

## ✨ Features

- **Animated hero** with a [Lottie](https://airbnb.io/lottie/) illustration (played once per session) and a static fallback image if the animation fails.
- **Culture section** covering Mission, Vision, and Values.
- **Interactive values diagram**: seven tags over a burger photo that reveal a popup on hover or keyboard focus.
- **Team carousel** with 12 members, arrows, dot indicators, **swipe** support on mobile, and infinite looping.
- **Menu** with 5 burgers (including a vegetarian option), each with photo, description, and price.
- **Smart navbar**: hides when scrolling down, reappears when scrolling up, and highlights the active section using `IntersectionObserver`.
- **Smooth scrolling** between anchors, offset by the header height.
- **Scroll-reveal animations**.
- **Responsive design** with breakpoints at 1024px, 768px, and 420px and a hamburger menu on mobile.
- **Accessibility**: semantic HTML, `aria-*` attributes, keyboard-accessible tooltips, and a menu that closes with `Esc`.
- **SEO**: meta tags, keywords, and Open Graph.
- **Security**: HTTP headers (CSP, HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`) configured in `vercel.json`.

## 🛠️ Tech stack

| Technology | Purpose |
| --- | --- |
| HTML5 | Semantic structure |
| CSS3 | Styling, CSS variables, Grid/Flexbox, responsiveness |
| JavaScript (ES6+) | Interactions, carousel, observers, mobile menu |
| [lottie-web](https://github.com/airbnb/lottie-web) 5.12.2 | Burger animation (via cdnjs) |
| [Alexandria](https://fonts.google.com/specimen/Alexandria) font | Typography (self-hosted `.woff2`) |
| [Vercel](https://vercel.com/) | Hosting and security headers |

No frameworks, no bundlers, no build step.

## ☁️ Deployment

The site is deployed on **Vercel**: [https://laricasburguerunime.vercel.app/](https://laricasburguerunime.vercel.app/). The `vercel.json` file rewrites `/` to `/pages/index.html` and applies the security headers. There is no build step.

## 📁 Project structure

```
website-laricas-burguer/
├── assets/
│   ├── animations/        # Lottie animation (burgerAnimation.json)
│   ├── fonts/             # Alexandria font (.woff2)
│   ├── icons/             # Logos, social icons, carousel arrows
│   └── photos/
│       ├── cardapio/      # Burger photos
│       ├── colaboradores/ # Team photos
│       └── secao_valores/ # Values section tags
├── css/
│   ├── estilos.css        # Entry point (@imports the others)
│   ├── base.css           # Variables, reset, font, global styles
│   ├── componentes.css    # Navbar, carousel, menu, footer
│   ├── cultura-valores.css# Culture, mission, vision, and values
│   └── responsivo.css     # Media queries
├── js/
│   ├── principal.js       # Menu, navbar, carousel, scroll, animations
│   └── lottie-hamburguer.js # Animation loading with fallback
├── pages/
│   └── index.html         # Single page
└── vercel.json            # Rewrites and security headers
```

## 🍔 Menu

| Item | Highlights | Price |
| --- | --- | --- |
| **X-Lá Ele** | 150g patty, grilled coalho cheese, smoked sausage, bacon, and chili jam | R$ 29.90 |
| **Quebradeira** | Two 100g smash patties, creamy cheddar, bacon, and caramelized onion | R$ 25.90 |
| **Big Laranjada** | Two 100g smash patties, cheddar, bacon crumble, and giant onion rings | R$ 32.90 |
| **X-Migué** 🌱 | Vegetarian mushroom-and-grain patty, cheese, and house sauce | R$ 25.90 |
| **Barril Dobrado** | Two 150g patties with cheddar and prato cheese | R$ 36.90 |

## 🎓 Academic context

Built for a team of **UniAnhanguera** students as promotional material for their fictional company, **Larica's Burguer**.

## 👨‍💻 Author

Developed by **[@pedrohenriquefalcao](https://github.com/pedrohenriquefalcao)**.



