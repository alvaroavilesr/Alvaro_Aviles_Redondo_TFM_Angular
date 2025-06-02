describe('Tests de la aplicación', () => {

  describe('Página de inicio', () => {

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

  describe('Página de Ayuda', () => {

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

  describe('Página de Contacto', () => {

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

  describe('Página de Sobre Nosotros', () => {

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

      it('Al hacer click en Login navega a la página correcta', () => {
        cy.get('nav.navbar a.nav-link')
          .contains('Login')
          .click()

        cy.url().should('include', '/login')
      })
    })
  })

  describe('Página de Login', () => {

    beforeEach(() => {
      cy.visit('http://localhost:4200/login')
    })

    describe('Verifica formulario', () => {
      it('Debe mostrar el formulario de login', () => {
        cy.get('#loginForm').should('exist')
      })

      it('Debe mostrar el campo de nombre de usuario', () => {
        cy.get('input#username')
          .should('exist')
          .should('have.attr', 'placeholder', 'User1')
      })

      it('Debe permitir escribir en el campo de nombre de usuario', () => {
        cy.get('input#username')
          .type('usuarioTest')
          .should('have.value', 'usuarioTest')
      })

      it('Debe mostrar el campo de contraseña', () => {
        cy.get('input#password')
          .should('exist')
          .should('have.attr', 'placeholder', 'C0ntr@señ@')
      })

      it('Debe permitir escribir en el campo de contraseña', () => {
        cy.get('input#password')
          .type('123456')
          .should('have.value', '123456')
      })

      it('Debe mostrar el botón de login y permitir hacer clic', () => {
        cy.get('#btnLogin')
          .should('exist')
          .and('contain.text', 'Login')
          .click()
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

    describe('Verifica Accesos', () => {
      it('Debe mostrar toast de error con usuario', () => {
        cy.get('input#username')
          .type('User1')
        cy.get('input#password')
          .type('pass')
        cy.get('#btnLogin')
          .click()
      })

      it('Debe acceder a la pagina de usuario', () => {
        cy.get('input#username')
          .type('User1')
        cy.get('input#password')
          .type('user@pass')
        cy.get('#btnLogin')
          .click()
        cy.wait(1000)
        cy.url().should('include', '/shop')
        cy.window().then((win) => {
          const token = win.sessionStorage.getItem('JWT')
          expect(token).to.exist
          expect(token).to.include('ey')
        })
      })

      it('Debe mostrar toast de error con vendedor', () => {
        cy.get('input#username')
          .type('Vendor1')
        cy.get('input#password')
          .type('pass')
        cy.get('#btnLogin')
          .click()
      })

      it('Debe acceder a la pagina de vendedor', () => {
        cy.get('input#username')
          .type('Vendor1')
        cy.get('input#password')
          .type('vendor@pass')
        cy.get('#btnLogin')
          .click()
        cy.wait(1000)
        cy.url().should('include', '/category-management')
        cy.window().then((win) => {
          const token = win.sessionStorage.getItem('JWT')
          expect(token).to.exist
          expect(token).to.include('ey')
        })
      })

      it('Debe mostrar toast de error con administrador', () => {
        cy.get('input#username')
          .type('Admin11')
        cy.get('input#password')
          .type('pass')
        cy.get('#btnLogin')
          .click()
      })

      it('Debe acceder a la pagina de administrador', () => {
        cy.get('input#username')
          .type('Admin1')
        cy.get('input#password')
          .type('admin@pass')
        cy.get('#btnLogin')
          .click()
        cy.wait(1000)
        cy.url().should('include', '/user-management')
        cy.window().then((win) => {
          const token = win.sessionStorage.getItem('JWT')
          expect(token).to.exist
          expect(token).to.include('ey')
        })
      })
    })
  })
})
