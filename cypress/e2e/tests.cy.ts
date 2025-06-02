describe('Tests de la aplicación', () => {

  describe('Pantalla de inicio', () => {

    beforeEach(() => {
      cy.visit('http://localhost:4200/home')
    })

    describe('Verifica textos', () => {
      it('Debe mostrar parrafo de ¿Quienes somos?', () => {
        cy.contains('h2', '¿Quienes somos?').should('exist')
      })

      it('Debe mostrar parrafo de Nuestros productos', () => {
        cy.contains('h2', 'Nuestros productos').should('exist')
      })

      it('Debe mostrar parrafo de ¿Porque elegirnos?', () => {
        cy.contains('h2', '¿Porque elegirnos?').should('exist')
      })
    })

    describe('Verifica Imagenes', () => {
      it('Debe mostrar imagen 1', () => {
        cy.get('img[src="images/Moda.jpg"]').should('exist')
      })

      it('Debe mostrar imagen 2', () => {
        cy.get('img[src="images/Textil.jpg"]').should('exist')
      })
    })

    describe('Verifica Carrousel', () => {
      it('Debe mostrar el carrusel y sus controles', () => {
        cy.get('#carousel').should('be.visible')

        cy.get('#carousel .carousel-indicators button')
          .should('have.length', 3)

        cy.get('#carousel .carousel-control-prev').should('exist')
        cy.get('#carousel .carousel-control-next').should('exist')
      })

      it('Navega al siguiente slide y verifica el cambio', () => {
        cy.get('#carousel .carousel-item.active').then(($active) => {
          const firstSrc = $active.find('img').attr('src')

          cy.get('#carousel .carousel-control-next').click()

          cy.get('#carousel .carousel-item.active img').should(($img) => {
            expect($img.attr('src')).not.to.eq(firstSrc)
          })
        })
      })

      it('Navega al slide anterior y verifica el cambio', () => {
        cy.get('#carousel .carousel-item.active').then(($active) => {
          const currentSrc = $active.find('img').attr('src')

          cy.get('#carousel .carousel-control-prev').click()

          cy.get('#carousel .carousel-item.active img').should(($img) => {
            expect($img.attr('src')).not.to.eq(currentSrc)
          })
        })
      })
    })

    describe('Verifica Footer', () => {
      it('Debe mostrar el footer con el texto correcto', () => {
        cy.get('footer.bg-dark')
          .should('be.visible')
          .within(() => {
            cy.get('p.mb-0')
              .should('contain.text', '© 2025 The Clothing Hub, Inc')
          })
      })
    })

    describe('Verifica Navbar', () => {
      it('Debe mostrar el navbar con el título correcto', () => {
        cy.get('nav.navbar').should('be.visible')
        cy.get('nav.navbar .navbar-brand').should('contain.text', 'The Clothing Hub')
      })

      it('Debe mostrar los enlaces principales correctos', () => {
        const mainLinks = [
          { text: 'Home', href: '/home' },
          { text: 'Ayuda', href: '/help' },
          { text: 'Contacto', href: '/contact' },
          { text: 'Sobre nosotros', href: '/about' }
        ]

        mainLinks.forEach(link => {
          cy.get('nav.navbar ul.navbar-nav.me-auto li.nav-item a.nav-link')
            .contains(link.text)
            .should('have.attr', 'href', link.href)
        })
      })

      it('Debe mostrar los enlaces de usuario no logueado', () => {
        const userLinks = [
          { text: 'Login', href: '/login' },
          { text: 'Registro', href: '/register' }
        ]

        userLinks.forEach(link => {
          cy.get('nav.navbar ul#notLoggedMenu li.nav-item a.nav-link')
            .contains(link.text)
            .should('have.attr', 'href', link.href)
        })
      })

      it('Al hacer click en Ayuda navega a la página correcta', () => {
        cy.get('nav.navbar ul.navbar-nav.me-auto li.nav-item a.nav-link')
          .contains('Ayuda')
          .click()

        cy.url().should('include', '/help')
      })
    })
  })

  describe('Pantalla de Ayuda', () => {

    beforeEach(() => {
      cy.visit('http://localhost:4200/help')
    })

    describe('Verifica textos', () => {
      it('Debe mostrar el título Ayuda', () => {
        cy.contains('h2', 'Ayuda').should('exist')
      })

      it('Debe mostrar persona de contacto', () => {
        cy.contains('p', 'Persona de contacto').should('exist')
      })

      it('Debe mostrar email de contacto', () => {
        cy.contains('p', 'Email de contacto').should('exist')
      })
    })

    describe('Verifica Footer', () => {
      it('Debe mostrar el footer con el texto correcto', () => {
        cy.get('footer.bg-dark')
          .should('be.visible')
          .within(() => {
            cy.get('p.mb-0')
              .should('contain.text', '© 2025 The Clothing Hub, Inc')
          })
      })
    })

    describe('Verifica Navbar', () => {
      it('Debe mostrar el navbar con el título correcto', () => {
        cy.get('nav.navbar').should('be.visible')
        cy.get('nav.navbar .navbar-brand').should('contain.text', 'The Clothing Hub')
      })

      it('Debe mostrar los enlaces principales correctos', () => {
        const mainLinks = [
          {text: 'Home', href: '/home'},
          {text: 'Ayuda', href: '/help'},
          {text: 'Contacto', href: '/contact'},
          {text: 'Sobre nosotros', href: '/about'}
        ]

        mainLinks.forEach(link => {
          cy.get('nav.navbar ul.navbar-nav.me-auto li.nav-item a.nav-link')
            .contains(link.text)
            .should('have.attr', 'href', link.href)
        })
      })

      it('Debe mostrar los enlaces de usuario no logueado', () => {
        const userLinks = [
          {text: 'Login', href: '/login'},
          {text: 'Registro', href: '/register'}
        ]

        userLinks.forEach(link => {
          cy.get('nav.navbar ul#notLoggedMenu li.nav-item a.nav-link')
            .contains(link.text)
            .should('have.attr', 'href', link.href)
        })
      })

      it('Al hacer click en Contacto navega a la página correcta', () => {
        cy.get('nav.navbar ul.navbar-nav.me-auto li.nav-item a.nav-link')
          .contains('Contacto')
          .click()

        cy.url().should('include', '/contact')
      })
    })
  })

  describe('Pantalla de Contacto', () => {

    beforeEach(() => {
      cy.visit('http://localhost:4200/contact')
    })

    describe('Verifica textos', () => {
      it('Debe mostrar el título Contacto', () => {
        cy.contains('h2', 'Contacto').should('exist')
      })

      it('Debe mostrar persona de contacto', () => {
        cy.contains('p', 'Persona de contacto').should('exist')
      })

      it('Debe mostrar email de contacto', () => {
        cy.contains('p', 'Email de contacto').should('exist')
      })
    })

    describe('Verifica Footer', () => {
      it('Debe mostrar el footer con el texto correcto', () => {
        cy.get('footer.bg-dark')
          .should('be.visible')
          .within(() => {
            cy.get('p.mb-0')
              .should('contain.text', '© 2025 The Clothing Hub, Inc')
          })
      })
    })

    describe('Verifica Navbar', () => {
      it('Debe mostrar el navbar con el título correcto', () => {
        cy.get('nav.navbar').should('be.visible')
        cy.get('nav.navbar .navbar-brand').should('contain.text', 'The Clothing Hub')
      })

      it('Debe mostrar los enlaces principales correctos', () => {
        const mainLinks = [
          {text: 'Home', href: '/home'},
          {text: 'Ayuda', href: '/help'},
          {text: 'Contacto', href: '/contact'},
          {text: 'Sobre nosotros', href: '/about'}
        ]

        mainLinks.forEach(link => {
          cy.get('nav.navbar ul.navbar-nav.me-auto li.nav-item a.nav-link')
            .contains(link.text)
            .should('have.attr', 'href', link.href)
        })
      })

      it('Debe mostrar los enlaces de usuario no logueado', () => {
        const userLinks = [
          {text: 'Login', href: '/login'},
          {text: 'Registro', href: '/register'}
        ]

        userLinks.forEach(link => {
          cy.get('nav.navbar ul#notLoggedMenu li.nav-item a.nav-link')
            .contains(link.text)
            .should('have.attr', 'href', link.href)
        })
      })

      it('Al hacer click en Sobre nosotros navega a la página correcta', () => {
        cy.get('nav.navbar ul.navbar-nav.me-auto li.nav-item a.nav-link')
          .contains('Sobre nosotros')
          .click()

        cy.url().should('include', '/about')
      })
    })
  })

  describe('Pantalla de Sobre Nosotros', () => {

    beforeEach(() => {
      cy.visit('http://localhost:4200/about')
    })

    describe('Verifica textos', () => {
      it('Debe mostrar el título Sobre Nosotros', () => {
        cy.contains('h2', 'Sobre nosotros').should('exist')
      })

      it('Debe mostrar parrafo', () => {
        cy.contains('p', 'Actualmente seguimos en crecimiento').should('exist')
      })
    })

    describe('Verifica Footer', () => {
      it('Debe mostrar el footer con el texto correcto', () => {
        cy.get('footer.bg-dark')
          .should('be.visible')
          .within(() => {
            cy.get('p.mb-0')
              .should('contain.text', '© 2025 The Clothing Hub, Inc')
          })
      })
    })

    describe('Verifica Imagenes', () => {
      it('Debe mostrar imagen 1', () => {
        cy.get('img[src="images/Sostenible.jpg"]').should('exist')
      })

      it('Debe mostrar imagen 2', () => {
        cy.get('img[src="images/Moda.jpg"]').should('exist')
      })
    })

    describe('Verifica Navbar', () => {
      it('Debe mostrar el navbar con el título correcto', () => {
        cy.get('nav.navbar').should('be.visible')
        cy.get('nav.navbar .navbar-brand').should('contain.text', 'The Clothing Hub')
      })

      it('Debe mostrar los enlaces principales correctos', () => {
        const mainLinks = [
          {text: 'Home', href: '/home'},
          {text: 'Ayuda', href: '/help'},
          {text: 'Contacto', href: '/contact'},
          {text: 'Sobre nosotros', href: '/about'}
        ]

        mainLinks.forEach(link => {
          cy.get('nav.navbar ul.navbar-nav.me-auto li.nav-item a.nav-link')
            .contains(link.text)
            .should('have.attr', 'href', link.href)
        })
      })

      it('Debe mostrar los enlaces de usuario no logueado', () => {
        const userLinks = [
          {text: 'Login', href: '/login'},
          {text: 'Registro', href: '/register'}
        ]

        userLinks.forEach(link => {
          cy.get('nav.navbar ul#notLoggedMenu li.nav-item a.nav-link')
            .contains(link.text)
            .should('have.attr', 'href', link.href)
        })
      })

      it('Al hacer click en Login', () => {
        cy.get('nav.navbar a.nav-link')
          .contains('Login')
          .click()

        cy.url().should('include', '/login')
      })
    })
  })
})
