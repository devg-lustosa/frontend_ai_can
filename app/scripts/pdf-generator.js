// app/scripts/pdf-generator.js

// Constantes de Configuração
const PDF_CONFIG = {
    A4_HEIGHT_MM: 297,
    A4_HEIGHT_PX: 1122,
    PAGE_BREAK_COLOR: '#FFD700',
    PAGE_BREAK_WIDTH: '3px',
    PRIMARY_COLOR: '#008fcb',
    STYLES: {
        modal: {
            base: 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.85); display: flex; align-items: center; justify-content: center; z-index: 9999; padding: 20px;',
            container: 'background: white; border-radius: 12px; max-width: 600px; width: 100%; max-height: 85vh; overflow-y: auto; padding: 30px; position: relative; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);',
            content: 'font-family: Arial, sans-serif; color: #333; line-height: 1.6;',
            button: 'flex: 1; padding: 12px 20px; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 14px; transition: background-color 0.3s;'
        }
    }
};

function criarBotao(texto, estilo, onClickFn) {
    const btn = document.createElement('button');
    btn.textContent = texto;
    btn.style.cssText = estilo;
    if (onClickFn) btn.onclick = onClickFn;
    return btn;
}

const pdfBtn = document.querySelector('#btnGeneratePDF');
if (pdfBtn) pdfBtn.addEventListener('click', (e) => gerarPDFCompleto(e));

const previewBtn = document.querySelector('#btnPreviewPDF');
if (previewBtn) previewBtn.addEventListener('click', () => abrirPreviewPDF());

function adicionarDelimitadoresPagina(conteudoPDF) {
    const altura = conteudoPDF.scrollHeight;
    const numPaginas = Math.ceil(altura / PDF_CONFIG.A4_HEIGHT_PX);

    for (let i = 1; i < numPaginas; i++) {
        const posicao = PDF_CONFIG.A4_HEIGHT_PX * i;
        const delimitador = document.createElement('div');
        delimitador.style.cssText = `
            position: absolute;
            top: ${posicao}px;
            left: 0;
            right: 0;
            height: ${PDF_CONFIG.PAGE_BREAK_WIDTH};
            background: repeating-linear-gradient(
                90deg,
                ${PDF_CONFIG.PAGE_BREAK_COLOR} 0px,
                ${PDF_CONFIG.PAGE_BREAK_COLOR} 10px,
                transparent 10px,
                transparent 20px
            );
            pointer-events: none;
            z-index: 1000;
        `;
        conteudoPDF.appendChild(delimitador);
    }
}

function abrirPreviewPDF() {
    const stored = carregarLocalStorage(STORAGE_CONFIG.PLAN_KEY);
    const plano = stored?.plano || stored;

    if (!plano || !plano.nome_da_rotina) {
        alert('Nenhum plano de treino encontrado para visualizar.');
        return;
    }

    const modal = document.createElement('div');
    modal.id = 'previewModal';
    modal.style.cssText = PDF_CONFIG.STYLES.modal.base;

    const conteudoPreview = gerarConteudoPDF(plano);

    const container = document.createElement('div');
    container.style.cssText = PDF_CONFIG.STYLES.modal.container;

    const previewContent = document.createElement('div');
    previewContent.innerHTML = conteudoPreview;
    previewContent.style.cssText = PDF_CONFIG.STYLES.modal.content;

    const altura = previewContent.scrollHeight;
    const numPaginas = Math.ceil(altura / PDF_CONFIG.A4_HEIGHT_PX);

    if (numPaginas > 1) {
        const indicador = document.createElement('div');
        indicador.style.cssText = `
            background: #FFF3CD;
            border: 2px dashed ${PDF_CONFIG.PAGE_BREAK_COLOR};
            padding: 12px;
            border-radius: 6px;
            margin-bottom: 20px;
            color: #856404;
            font-weight: 600;
            font-size: 13px;
        `;
        indicador.innerHTML = `Este PDF ocupará <strong>${numPaginas} páginas</strong>. As linhas tracejadas indicam onde as páginas quebram.`;
        previewContent.insertAdjacentHTML('afterbegin', indicador.outerHTML);
    }

    for (let i = 1; i < numPaginas; i++) {
        const marcador = document.createElement('div');
        marcador.style.cssText = `
            border-top: 3px dashed ${PDF_CONFIG.PAGE_BREAK_COLOR};
            margin: 30px 0;
            padding: 10px 0;
            text-align: center;
            color: ${PDF_CONFIG.PAGE_BREAK_COLOR};
            font-size: 12px;
            font-weight: bold;
        `;
        marcador.textContent = '--- QUEBRA DE PÁGINA ---';
        previewContent.appendChild(marcador);
    }

    container.appendChild(previewContent);

    const botoes = document.createElement('div');
    botoes.style.cssText = 'display: flex; gap: 12px; margin-top: 20px; border-top: 1px solid #ddd; padding-top: 20px;';

    const btnGerarPDF = criarBotao(
        'Gerar PDF',
        `${PDF_CONFIG.STYLES.modal.button} background-color: ${PDF_CONFIG.PRIMARY_COLOR}; color: white;`,
        () => {
            document.body.removeChild(modal);
            gerarPDFCompleto(null, true);
        }
    );
    btnGerarPDF.onmouseover = () => btnGerarPDF.style.backgroundColor = '#0278aa';
    btnGerarPDF.onmouseout = () => btnGerarPDF.style.backgroundColor = PDF_CONFIG.PRIMARY_COLOR;

    const btnFechar = criarBotao(
        'Fechar',
        `${PDF_CONFIG.STYLES.modal.button} background-color: #666; color: white;`,
        () => document.body.removeChild(modal)
    );
    btnFechar.onmouseover = () => btnFechar.style.backgroundColor = '#555';
    btnFechar.onmouseout = () => btnFechar.style.backgroundColor = '#666';

    botoes.appendChild(btnGerarPDF);
    botoes.appendChild(btnFechar);
    container.appendChild(botoes);

    modal.appendChild(container);
    document.body.appendChild(modal);
}

function gerarPDFCompleto(e, comDelimitadores = true) {
    const stored = carregarLocalStorage(STORAGE_CONFIG.PLAN_KEY);
    const plano = stored?.plano || stored;

    if (!plano || !plano.nome_da_rotina) {
        alert('Nenhum plano de treino encontrado para gerar o PDF.');
        return;
    }

    const conteudoPDF = document.createElement('div');
    conteudoPDF.style.cssText = 'padding: 20px; font-family: Arial, sans-serif; color: #333; background-color: #fff; position: relative;';

    const htmlContent = gerarConteudoPDF(plano);
    conteudoPDF.innerHTML = htmlContent;

    if (comDelimitadores) {
        adicionarDelimitadoresPagina(conteudoPDF);
    }

    const safeName = (plano?.nome_da_rotina || 'Plano_de_Treino_AICAN')
        .replace(/[^\w\s-]/g, '')
        .trim()
        .replace(/\s+/g, '_');

    const agora = new Date();
    const dia = agora.getDate().toString().padStart(2, '0');
    const mes = (agora.getMonth() + 1).toString().padStart(2, '0');
    const ano = agora.getFullYear();

    const nomeArquivo = `Treino_AICAN_${safeName}_${dia}_${mes}_${ano}.pdf`;

    const opt = {
        margin: 10,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    const btn = document.querySelector('#btnGeneratePDF');
    const textoOriginal = btn?.textContent || 'Gerar PDF';
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    if (btn) btn.textContent = 'Gerando PDF...';

    if (typeof html2pdf === 'undefined') {
        console.error('html2pdf library não carregada.');
        if (btn) btn.textContent = textoOriginal;
        alert('Ferramenta de geração de PDF ainda não carregada. Tente novamente em alguns segundos.');
        return;
    }

    html2pdf()
        .from(conteudoPDF)
        .set(opt)
        .save(nomeArquivo)
        .then(() => {
            if (btn) btn.textContent = textoOriginal;
        })
        .catch((err) => {
            console.error('Erro ao gerar PDF:', err);
            if (btn) btn.textContent = textoOriginal;
            alert('Erro ao gerar PDF. Tente novamente.');
        });
}

function converterURLsEmLinks(texto, cor = PDF_CONFIG.PRIMARY_COLOR) {
    if (!texto) return texto;
    if (typeof texto !== 'string') texto = String(texto);

    const urlPattern = /(https?:\/\/[^\s<>"{}|\\^`\[\]]+|www\.[^\s<>"{}|\\^`\[\]]+)/gi;

    return texto.replace(urlPattern, (url) => {
        let urlLimpa = url.replace(/[.,;:!?)\]]+$/, '');

        if (urlLimpa.startsWith('www.')) {
            urlLimpa = 'https://' + urlLimpa;
        }

        return `<span style="color: ${cor}; text-decoration: underline; font-weight: 600; word-break: break-all;">${urlLimpa}</span>`;
    });
}

function gerarConteudoPDF(plano) {
    const primaryColor = PDF_CONFIG.PRIMARY_COLOR;

    let htmlContent = `
    <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid ${primaryColor}; padding-bottom: 10px;">
      <h1 style="color: ${primaryColor}; margin: 0;">${plano.nome_da_rotina || 'Plano de Treino AICAN'}</h1>
      <p style="color: #666; margin-top: 5px;">Em caso de dúvidas sempre procure um profissional!</p>
    </div>
  `;

    if (plano.dias_de_treino) {
        plano.dias_de_treino.forEach(dia => {
            htmlContent += `
        <div style="margin-bottom: 25px; page-break-inside: avoid;">
          <h3 style="background: ${primaryColor}; color: #fff; padding: 8px; border-radius: 4px;">
            ${dia.identificacao} - ${dia.foco_muscular}
          </h3>
      `;

            if (dia.exercicios) {
                dia.exercicios.forEach(ex => {
                    const detalhesComLinks = converterURLsEmLinks(ex.detalhes_execucao, primaryColor);

                    htmlContent += `
            <div style="margin-bottom: 10px; padding-left: 10px; border-left: 3px solid #eee;">
              <strong style="font-size: 14px;">${ex.nome}</strong>
                <div style="font-size: 12px; color: #333;">
                Séries: ${ex.series} | Reps: ${ex.repeticoes} | Descanso: ${ex.descanso_segundos}s
              </div>
              <div style="font-size: 11px; color: #666; font-style: italic; margin-bottom: 5px;">
                ${detalhesComLinks}
              </div>`;

                    if (ex.video_url) {
                        const videoUrlFormatado = converterURLsEmLinks(ex.video_url, primaryColor);
                        htmlContent += `<div style="font-size: 11px; padding: 6px 8px; background: #e3f2fd; border-radius: 3px; border-left: 3px solid ${primaryColor}; margin-top: 5px;">
                <strong style="color: ${primaryColor};">Vídeo:</strong> ${videoUrlFormatado}
              </div>`;
                    }

                    htmlContent += `</div>`;
                });
            }
            htmlContent += `</div>`;
        });
    }

    htmlContent += `<div style="margin-top: 12px;">
    <h2 style="color: ${primaryColor}; border-bottom: 1px solid #ddd;">Nutrição Sugerida</h2>`;

    const renderRefeicao = (titulo, lista) => {
        if (!lista || lista.length === 0) return '';
        let html = `<h4 style="margin-top: 20px; color: #333;">${titulo}</h4>`;
        Object.values(lista).forEach(item => {
            const explicacaoComLinks = converterURLsEmLinks(item.explicacao, primaryColor);

            html += `
        <div style="background: #f9f9f9; padding: 10px; border-radius: 5px; margin-bottom: 10px;">
          <strong style="color: ${primaryColor};">${item.nome}</strong>
          <ul style="margin: 5px 0; padding-left: 20px; font-size: 12px;">
            ${item.ingredientes.map(ing => `<li>${ing}</li>`).join('')}
          </ul>
          <p style="font-size: 12px; margin: 0; margin-bottom: 8px;">${explicacaoComLinks}</p>`;

            if (item.link_receita) {
                const linkFormatado = converterURLsEmLinks(item.link_receita, primaryColor);
                html += `<div style="margin-top: 5px; font-size: 12px; font-weight: 600;">🔗 ${linkFormatado}</div>`;
            }

            html += `</div>`;
        });
        return html;
    };

    if (plano.sugestoes_nutricionais) {
        htmlContent += renderRefeicao('Pré-Treino', plano.sugestoes_nutricionais.pre_treino);
        htmlContent += renderRefeicao('Pós-Treino', plano.sugestoes_nutricionais.pos_treino);
    }

    htmlContent += `</div>`;

    return htmlContent;
}