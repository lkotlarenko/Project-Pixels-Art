const WHITE = 'rgb(255, 255, 255)';
const BLACK = 'rgb(0, 0, 0)';

function chunk(arr, len) {
  const chunks = [];
  let i = 0;
  const n = arr.length;

  while (i < n) {
    chunks.push(arr.slice(i, i += len));
  }

  return chunks;
}

describe('1 - Adicione à página o título "Paleta de Cores".', () => {
  beforeEach(() => {
    cy.visit('./index.html');
  });

  it('Verifica se contém um elemento `h1` com o id `title` com o título correto', () => {
    cy.get('h1#title').should('contain.text', 'Paleta de Cores');
  });
});

describe('2 - Adicione à página uma paleta de quatro cores distintas.', () => {
  beforeEach(() => {
    cy.visit('./index.html');
  });

  it('A paleta de cores deve ser um elemento com `id` denominado `color-palette`', () => {
    cy.get('#color-palette').should('be.visible');
    cy.get('#color-palette').children('.color');
  });
  
  it('Verifica se cada cor individual da paleta de cores possui a `classe` chamada `color`.', () => {
    cy.get('.color')
      .should('have.length', 4)
      .then((colors) => {
        for (let i = 0; i < colors.length; i++) {
          cy.wrap(colors[i])
            .should('be.visible');
        }
      });
  });

  it('Verifica se a cor de fundo de cada elemento da paleta é a cor que o elemento representa. **A única cor não permitida na paleta é a cor branca.**', () => {
    cy.get('.color')
      .each((color) => {
        cy.wrap(color)
          .should('have.class', 'color')
          .and('not.have.css', 'background-color', WHITE);
        cy.wrap(color)
          .should('have.css', 'background-color');
      });
  });

  it('Verifica se cada elemento da paleta de cores tem uma borda preta, sólida e com 1 pixel de largura;', () => {
    cy.get('.color')
      .each((color) => {
        cy.wrap(color)
          .and('have.css', 'border', `1px solid ${BLACK}`)
          .and('have.class', 'color');
      });
  });

  it('Verifica se a paleta lista todas as cores disponíveis para utilização, lado a lado.', () => {
    cy.get('.color')
      .then((colors) => {
        for (let index = 1; index < colors.length; index += 1) {
          const currentColor = colors[index];
          const previousColor = colors[index - 1];
          cy.wrap(currentColor)
            .should('be.onTheRightOf', previousColor)
            .and('be.horizontallyAlignedWith', previousColor);
        }
      });
  });

  it('Verifica se a paleta de cores está posicionada abaixo do título \'Paleta de Cores\'', () => {
    cy.get('h1#title').then((title) => {
      cy.get('#color-palette').should('be.belowOf', title);
    });
  });

  it('Verifica se a paleta de cores não contém cores repetidas.', () => {
    cy.get('.color').then((colors) => {
      const allColors = Array.from(colors).map((color) => (
        Cypress.$(color).css('background-color')
      ));
      cy.log(allColors);
      const uniqColors = [...new Set(allColors)];
      cy.log(uniqColors);
      expect(allColors.length).to.eq(uniqColors.length);
    });
  });
});

describe('3 - Adicione a cor **preta** como a primeira cor da paleta de cores.', () => {
  beforeEach(() => {
    cy.visit('./index.html');
  });

  it('Verifica se a primeira cor da paleta é preta', () => {
    cy.get('.color')
      .first()
      .should('have.css', 'background-color', BLACK);
  });

  it('Verifica se as demais cores podem ser escolhidas livremente.', () => {
    cy.get('.color')
      .eq(1)
      .should('not.have.css', 'background-color', BLACK);
    cy.get('.color')
      .eq(1)
      .should('not.have.css', 'background-color', WHITE);
    cy.get('.color')
      .eq(1)
      .should('not.have.css', 'background-color', 'rgba(0, 0, 0, 0)');
    cy.get('.color')
      .eq(1)
      .should('have.css', 'background-color');

    cy.get('.color')
      .eq(2)
      .should('not.have.css', 'background-color', BLACK);
    cy.get('.color')
      .eq(2)
      .should('not.have.css', 'background-color', WHITE);
    cy.get('.color')
      .eq(2)
      .should('not.have.css', 'background-color', 'rgba(0, 0, 0, 0)');
    cy.get('.color')
      .eq(2)
      .should('have.css', 'background-color');

    cy.get('.color')
      .eq(3)
      .should('not.have.css', 'background-color', BLACK);
    cy.get('.color')
      .eq(3)
      .should('not.have.css', 'background-color', WHITE);
    cy.get('.color')
      .eq(3)
      .should('not.have.css', 'background-color', 'rgba(0, 0, 0, 0)');
    cy.get('.color')
      .eq(3)
      .should('have.css', 'background-color');
  });
});

describe('4 - Adicione à página um quadro de pixels, com 25 pixels.', () => {
  beforeEach(() => {
    cy.visit('./index.html');
  });

  it('Verifica se o quadro de pixels possui o `id` denominado `pixel-board`', () => {
    cy.get('#pixel-board').should('be.visible');
  });

  it('Verifica se cada pixel individual dentro do quadro possui a `classe` denominada `pixel`.', () => {
    cy.get('.pixel').should('have.length', 25);
  });

  it('Verifica se a cor inicial dos pixels dentro do quadro, ao abrir a página, é branca.', () => {
    cy.get('.pixel')
      .should('have.length', 25)
      .each((pixel) => {
        expect(pixel).to.have.css('background-color', WHITE);
      });
  });

  it('Verifica se o quadro de pixels aparece abaixo da paleta de cores', () => {
    cy.get('#color-palette').then((palette) => {
      cy.get('#pixel-board').should('be.belowOf', palette);
    });
  });
});

describe('5 - Faça com que cada elemento do quadro de pixels possua 40 pixels de largura, 40 pixels de altura e seja delimitado por uma borda preta de 1 pixel.', () => {
  beforeEach(() => {
    cy.visit('./index.html');
  });

  it('Verifica se o quadro de pixels tem altura e comprimento de 5 elementos', () => {
    cy.get('.pixel')
      .should('have.length', 25)
      .each((pixel) => {
        expect(pixel).to.have.css('background-color', WHITE);
      })
      .and((pixels) => {
        const rows = chunk(pixels, 5);
        rows.forEach((row) => {
          for (let index = 1; index < row.length; index += 1) {
            const current = pixels[index];
            const previous = pixels[index - 1];
            cy.wrap(current)
              .should('be.onTheRightOf', previous)
              .and('be.horizontallyAlignedWith', previous);
          }
        });

        for (let index = 1; index < 5; index += 1) {
          expect(pixels[index * 5]).to.be.belowOf(pixels[(index - 1) * 5]);
        }
      });
  });

  it('Verifica se 40 pixels é o tamanho total do elemento, incluindo seu conteúdo e excluindo a borda preta, que deve ser criada à parte.', () => {
    cy.get('.pixel')
      .each((pixel) => {
        cy.wrap(pixel)
          .should('have.css', 'height', '40px')
          .and('have.css', 'width', '40px')
          .and('have.css', 'border', `1px solid ${BLACK}`);
      });
  });
});

describe('6 - Defina a cor preta como cor inicial. Ao carregar a página a cor preta já deve estar selecionada para pintar os pixels', () => {
  beforeEach(() => {
    cy.visit('./index.html');
  });

  it('Verifica se o elemento da cor preta possui, inicialmente, a `classe` `selected`', () => {
    cy.get('.selected').first().should('have.css', 'background-color', BLACK);
  });

  it('Verifica se nenhuma outra cor da paleta tem a `classe` `selected`', () => {
    cy.get('.color:not(:first-child)')
      .each((color) => {
        cy.wrap(color).should('not.have.class', 'selected');
      });
  });
});

describe('7 - Clicar em uma das cores da paleta, faz com que ela seja selecionada e utilizada para preencher os pixels no quadro.', () => {
  beforeEach(() => {
    cy.visit('./index.html');
  });

  it('Verifica se somente uma cor da paleta de cores tem a classe `selected` de cada vez', () => {
    cy.get('.color').each((selectedColor, selectedColorIndex) => {
      cy.wrap(selectedColor).click();
      cy.get('.color').each((color, colorIndex) => {
        if (colorIndex === selectedColorIndex) {
          expect(color).to.have.class('selected');
        } else {
          expect(color).not.to.have.class('selected');
        }
      });
    });
  });

  it('Verifica se os pixels dentro do quadro não têm a classe `selected` quando são clicados', () => {
    cy.get('.color').each((color) => {
      const backgroundColor = color.css('background-color');
      cy.wrap(color).click();
      cy.get('.pixel').each((pixel) => {
        cy.wrap(pixel)
          .click()
          .should('not.have.class', 'selected');
      });
    });
  });
});

describe('8 - Clicar em um pixel dentro do quadro após selecionar uma cor na paleta, faz com que o pixel seja preenchido com a cor selecionada.', () => {
  beforeEach(() => {
    cy.visit('./index.html');
  });

  it('Verifica se ao carregar a página deve ser possível pintar os pixels de preto', () => {
    cy.get('.pixel').each((pixel) => {
      cy.wrap(pixel)
        .click()
        .should('have.css', 'background-color', BLACK);
    });
  });

  it('Verifica se após selecionar uma outra cor na paleta, é possível pintar os pixels com essa cor', () => {
    cy.get('.color').each((color) => {
      const backgroundColor = color.css('background-color');
      cy.wrap(color).click();
      cy.get('.pixel').each((pixel) => {
        cy.wrap(pixel)
          .click()
          .should('have.css', 'background-color', backgroundColor);
      });
    });
  });

  it('Verifica se somente o pixel que foi clicado foi preenchido com a cor selecionada, sem influenciar na cor dos demais pixels.', () => {
    const colorToPixelIndexMap = { 0: 6, 1: 8, 2: 16, 3: 18 };
    cy.get('.color').each((color, index) => {
      cy.wrap(color).click();
      const backgroundColor = color.css('background-color');
      const clickedPixelIndex = colorToPixelIndexMap[index];
      cy.get('.pixel').eq(clickedPixelIndex).click();

      cy.get('.pixel')
        .eq(clickedPixelIndex - 1)
        .should('not.have.css', 'background-color', backgroundColor);
      cy.get('.pixel')
        .eq(clickedPixelIndex + 1)
        .should('not.have.css', 'background-color', backgroundColor);

      cy.get('.pixel')
        .eq(clickedPixelIndex - 5)
        .should('not.have.css', 'background-color', backgroundColor);
      cy.get('.pixel')
        .eq(clickedPixelIndex + 5)
        .should('not.have.css', 'background-color', backgroundColor);

      cy.get('.pixel')
        .eq(clickedPixelIndex - 6)
        .should('not.have.css', 'background-color', backgroundColor);
      cy.get('.pixel')
        .eq(clickedPixelIndex - 4)
        .should('not.have.css', 'background-color', backgroundColor);
      cy.get('.pixel')
        .eq(clickedPixelIndex + 4)
        .should('not.have.css', 'background-color', backgroundColor);
      cy.get('.pixel')
        .eq(clickedPixelIndex + 6)
        .should('not.have.css', 'background-color', backgroundColor);
    });
  });
});

describe('9 - Crie um botão que, ao ser clicado, limpa o quadro preenchendo a cor de todos seus pixels com branco.', () => {
  beforeEach(() => {
    cy.visit('./index.html');
  });

  it('Verifica se o botão tem o `id` denominado `clear-board`', () => {
    cy.get('#clear-board').should('be.visible');
  });

  it('Verifica se o botão está posicionado entre a paleta de cores e o quadro de pixels', () => {
    cy.get('#color-palette').then((palette) => {
      cy.get('#clear-board').should('be.belowOf', palette);
    });

    cy.get('#clear-board').then((clearBtn) => {
      cy.get('#pixel-board').should('be.belowOf', clearBtn);
    });
  });

  it('Verifica se o texto do botão é \'Limpar\'', () => {
    cy.get('#clear-board').should('contain.text', 'Limpar');
  });

  it('Verifica se ao clicar no botão, o quadro de pixels é totalmente preenchido de branco', () => {
    cy.get('.color').eq(1).then((color) => {
      const backgroundColor = color.css('background-color');
      cy.wrap(color).click();
      cy.get('.pixel').each((pixel) => {
        cy.wrap(pixel)
          .click()
          .should('have.css', 'background-color', backgroundColor);
      });
    });

    cy.get('#clear-board').click();
    cy.get('.pixel').each((pixel) => {
      cy.wrap(pixel).should('have.css', 'background-color', WHITE);
    });
  });
});

describe('10 - Faça o quadro de pixels ter seu tamanho definido pelo usuário.', () => {
  beforeEach(() => {
    cy.visit('./index.html');
  });

  it('Verifica se existe um input com o id `board-size`', () => {
    cy.get('#board-size').should('be.visible');
  });

  it('Verifica se existe um botão com o id `generate-board`', () => {
    cy.get('#generate-board').should('be.visible');
  });

  it('Verifica se o input só aceita número maiores que zero. Essa restrição deve ser feita usando os atributos do elemento `input`', () => {
    cy.get('#board-size[type=\'number\'][min=\'1\']');
  });

  it('Verifica se o botão contém o texto \'VQV\'', () => {
    cy.get('#generate-board').contains(/vqv/i);
  });

  it('Verifica se o input está posicionado entre a paleta de cores e o quadro de pixels', () => {
    cy.get('#color-palette').then((palette) => {
      cy.get('#board-size').should('be.belowOf', palette);
    });

    cy.get('#board-size').then((palette) => {
      cy.get('#pixel-board').should('be.belowOf', palette);
    });
  });

  it('Verifica se o botão está posicionado ao lado do input', () => {
    cy.get('#board-size').then((board) => {
      cy.get('#generate-board').should('be.onTheRightOf', board);
    });
  });

  it('Verifica se nenhum valor for colocado no input ao clicar no botão, um `alert` é exibido com o texto: \'Board inválido!\'', () => {
    let alerted = false;
    cy.on('window:alert', (msg) => alerted = msg);

    cy.get('#generate-board')
      .click()
      .then(() => expect(alerted).to.match(/Board inválido!/i));
  });

  it('Verifica se ao clicar no botão com um valor preenchido, o tamanho do board muda.', () => {
    cy.get('#board-size').clear().type(10);
    cy.get('#generate-board').click();
    cy.get('.pixel').should('have.length', 100);
  });

  it('Verifica se o novo quadro tem todos os pixels preenchidos com a cor branca', () => {
    cy.get('#board-size').clear().type(6);
    cy.get('#generate-board').click();
    cy.get('.pixel')
      .should('have.length', 36)
      .each((pixel) => {
        expect(pixel).to.have.css('background-color', WHITE);
      });
  });
});

describe('11 - Limite o tamanho mínimo e máximo do board.', () => {
  beforeEach(() => {
    cy.visit('./index.html');
  });

  it('Verifica se a altura máxima do board é 50', () => {
    cy.get('#board-size').clear().type(50);
    cy.get('#generate-board').click();
    cy.get('.pixel').should('have.length', 2500);
  });

  it('Verifica se a altura do board é 5 quando um valor menor é colocado no input', () => {
    cy.get('#board-size').clear().type(4);
    cy.get('#generate-board').click();
    cy.get('.pixel').should('have.length', 25);
  });

  it('Verifica se a altura do board é 50 quando um valor maior é colocado no input', () => {
    cy.get('#board-size').clear().type(51);
    cy.get('#generate-board').click();
    cy.get('.pixel').should('have.length', 2500);
  });
});

describe('12 - Faça com que as cores da paleta sejam geradas aleatoriamente ao carregar a página.', () => {
  beforeEach(() => {
    cy.visit('./index.html');
  });

  it('Verifica se as cores geradas na paleta são diferentes a cada carregamento da página', () => {
    cy.get('.color').then((colors) => {
      let currentColors; let
        previousColors;

      previousColors = Array.from(colors).map((color) => (
        Cypress.$(color).css('background-color')
      ));

      for (let i = 0; i < 5; i += 1) {
        cy.reload();
        cy.get('.color').then((colors) => {
          currentColors = Array.from(colors).map((color) => (
            Cypress.$(color).css('background-color')
          ));

          expect(currentColors).not.to.deep.equal(previousColors);
          previousColors = currentColors;
        });
      }
    });
  });

  it('Verifica se a cor preta ainda está presente e é a primeira na sua paleta de cores', () => {
    cy.get('.color').then((colors) => {
      let currentColors; let
        previousColors;

      previousColors = Array.from(colors).map((color) => (
        Cypress.$(color).css('background-color')
      ));

      expect(previousColors[0]).to.eq(BLACK);

      for (let i = 0; i < 5; i += 1) {
        cy.reload();
        cy.get('.color').then((colors) => {
          currentColors = Array.from(colors).map((color) => (
            Cypress.$(color).css('background-color')
          ));

          expect(currentColors[0]).to.eq(BLACK);
          expect(currentColors).not.to.deep.equal(previousColors);
          previousColors = currentColors;
        });
      }
    });
  });
});
