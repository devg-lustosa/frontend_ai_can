// app/scripts/pdf-generator.js
// Gerador de PDF para planos de treino AICAN

const PDF_CONFIG = {
    // Dimensões
    A4_WIDTH_PX: 794,
    A4_HEIGHT_PX: 1122,
    A4_HEIGHT_MM: 297,
    
    // Cores
    PRIMARY_COLOR: '#008fcb',
    PRIMARY_HOVER: '#0278aa',
    PAGE_BREAK_COLOR: '#FFD700',
    
    // Configurações de renderização
    RENDER_DELAY_MS: 150,
    MOBILE_BREAKPOINT: 768,
    
    // Estilos do modal
    STYLES: {
        modal: {
            overlay: `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.85);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                padding: 20px;
            `,
            container: `
                background: white;
                border-radius: 12px;
                max-width: 600px;
                width: 100%;
                max-height: 85vh;
                overflow-y: auto;
                padding: 30px;
                position: relative;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
            `,
            closeButton: `
                position: absolute;
                top: 10px;
                right: 15px;
                background: none;
                border: none;
                font-size: 28px;
                cursor: pointer;
                color: #666;
                padding: 0;
                line-height: 1;
                transition: color 0.2s;
            `,
            content: `
                font-family: Arial, sans-serif;
                color: #333;
                line-height: 1.6;
                margin-top: 20px;
            `,
            buttonContainer: `
                display: flex;
                gap: 12px;
                margin-top: 20px;
                border-top: 1px solid #ddd;
                padding-top: 20px;
            `,
            button: `
                flex: 1;
                padding: 12px 20px;
                border: none;
                border-radius: 6px;
                font-weight: 600;
                cursor: pointer;
                font-size: 14px;
                transition: background-color 0.3s;
            `
        },
        pdf: {
            wrapper: `
                position: absolute;
                left: -10000px;
                top: 0;
                width: 794px;
                z-index: -9999;
                pointer-events: none;
                background: #fff;
            `,
            content: `
                width: 794px;
                padding: 40px;
                font-family: Arial, sans-serif;
                color: #333;
                background-color: #fff;
                box-sizing: border-box;
            `
        }
    }
};

function isMobileDevice() {
    const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return mobileRegex.test(navigator.userAgent) || window.innerWidth <= PDF_CONFIG.MOBILE_BREAKPOINT;
}

function obterPlanoTreino() {
    const stored = carregarLocalStorage(STORAGE_CONFIG.PLAN_KEY);
    return stored?.plano || stored;
}

function gerarNomeArquivoSeguro(nome) {
    return (nome || 'Plano_de_Treino_AICAN')
        .replace(/[^\w\s-]/g, '')
        .trim()
        .replace(/\s+/g, '_');
}

function gerarNomeArquivoPDF(nomeRotina) {
    const safeName = gerarNomeArquivoSeguro(nomeRotina);
    const agora = new Date();
    const data = [
        agora.getDate().toString().padStart(2, '0'),
        (agora.getMonth() + 1).toString().padStart(2, '0'),
        agora.getFullYear()
    ].join('_');
    
    return `Treino_AICAN_${safeName}_${data}.pdf`;
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

function criarBotaoEstilizado(texto, bgColor, hoverColor, onClick) {
    const btn = document.createElement('button');
    btn.textContent = texto;
    btn.style.cssText = `${PDF_CONFIG.STYLES.modal.button} background-color: ${bgColor}; color: white;`;
    
    btn.onmouseover = () => btn.style.backgroundColor = hoverColor;
    btn.onmouseout = () => btn.style.backgroundColor = bgColor;
    if (onClick) btn.onclick = onClick;
    
    return btn;
}

function criarBotaoFechar(onClose) {
    const btn = document.createElement('button');
    btn.innerHTML = '&times;';
    btn.style.cssText = PDF_CONFIG.STYLES.modal.closeButton;
    btn.setAttribute('aria-label', 'Fechar');
    
    btn.onmouseover = () => btn.style.color = '#333';
    btn.onmouseout = () => btn.style.color = '#666';
    btn.onclick = onClose;
    
    return btn;
}


function criarContainerPDF() {
    const wrapper = document.createElement('div');
    wrapper.id = 'pdf-render-container';
    wrapper.style.cssText = PDF_CONFIG.STYLES.pdf.wrapper;

    const content = document.createElement('div');
    content.style.cssText = PDF_CONFIG.STYLES.pdf.content;

    wrapper.appendChild(content);
    return { wrapper, content };
}

function gerarCabecalhoPDF(titulo) {
    return `
        <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid ${PDF_CONFIG.PRIMARY_COLOR}; padding-bottom: 10px;">
            <h1 style="color: ${PDF_CONFIG.PRIMARY_COLOR}; margin: 0;">${titulo || 'Plano de Treino AICAN'}</h1>
            <p style="color: #666; margin-top: 5px;">Em caso de dúvidas sempre procure um profissional</p>
        </div>
    `;
}

function gerarExercicioHTML(exercicio) {
    const detalhesComLinks = converterURLsEmLinks(exercicio.detalhes_execucao);
    
    let html = `
        <div style="margin-bottom: 10px; padding-left: 10px; border-left: 3px solid #eee;">
            <strong style="font-size: 14px;">${exercicio.nome}</strong>
            <div style="font-size: 12px; color: #333;">
                Séries: ${exercicio.series} | Reps: ${exercicio.repeticoes} | Descanso: ${exercicio.descanso_segundos}s
            </div>
            <div style="font-size: 11px; color: #666; font-style: italic; margin-bottom: 5px;">
                ${detalhesComLinks}
            </div>
    `;

    if (exercicio.video_url) {
        const videoUrlFormatado = converterURLsEmLinks(exercicio.video_url);
        html += `
            <div style="font-size: 11px; padding: 6px 8px; background: #e3f2fd; border-radius: 3px; border-left: 3px solid ${PDF_CONFIG.PRIMARY_COLOR}; margin-top: 5px;">
                <strong style="color: ${PDF_CONFIG.PRIMARY_COLOR};">Vídeo:</strong> ${videoUrlFormatado}
            </div>
        `;
    }

    html += '</div>';
    return html;
}

function gerarDiaTreinoHTML(dia) {
    let html = `
        <div style="margin-bottom: 25px; page-break-inside: avoid;">
            <h3 style="background: ${PDF_CONFIG.PRIMARY_COLOR}; color: #fff; padding: 8px; border-radius: 4px;">
                ${dia.identificacao} - ${dia.foco_muscular}
            </h3>
    `;

    if (dia.exercicios?.length) {
        dia.exercicios.forEach(ex => {
            html += gerarExercicioHTML(ex);
        });
    }

    html += '</div>';
    return html;
}

function gerarRefeicaoHTML(refeicao) {
    const explicacaoComLinks = converterURLsEmLinks(refeicao.explicacao);

    let html = `
        <div style="background: #f9f9f9; padding: 10px; border-radius: 5px; margin-bottom: 10px;">
            <strong style="color: ${PDF_CONFIG.PRIMARY_COLOR};">${refeicao.nome}</strong>
            <ul style="margin: 5px 0; padding-left: 20px; font-size: 12px;">
                ${refeicao.ingredientes.map(ing => `<li>${ing}</li>`).join('')}
            </ul>
            <p style="font-size: 12px; margin: 0; margin-bottom: 8px;">${explicacaoComLinks}</p>
    `;

    if (refeicao.link_receita) {
        const linkFormatado = converterURLsEmLinks(refeicao.link_receita);
        html += `<div style="margin-top: 5px; font-size: 12px; font-weight: 600;">🔗 ${linkFormatado}</div>`;
    }

    html += '</div>';
    return html;
}

function gerarSecaoNutricaoHTML(titulo, refeicoes) {
    if (!refeicoes || Object.keys(refeicoes).length === 0) return '';

    let html = `<h4 style="margin-top: 20px; color: #333;">${titulo}</h4>`;
    Object.values(refeicoes).forEach(refeicao => {
        html += gerarRefeicaoHTML(refeicao);
    });
    
    return html;
}

function gerarConteudoPDF(plano) {
    let html = gerarCabecalhoPDF(plano.nome_da_rotina);

    // Dias de treino
    if (plano.dias_de_treino?.length) {
        plano.dias_de_treino.forEach(dia => {
            html += gerarDiaTreinoHTML(dia);
        });
    }

    // Seção de nutrição
    html += `
        <div style="margin-top: 12px;">
            <h2 style="color: ${PDF_CONFIG.PRIMARY_COLOR}; border-bottom: 1px solid #ddd;">Nutrição Sugerida</h2>
    `;

    if (plano.sugestoes_nutricionais) {
        html += gerarSecaoNutricaoHTML('Pré-Treino', plano.sugestoes_nutricionais.pre_treino);
        html += gerarSecaoNutricaoHTML('Pós-Treino', plano.sugestoes_nutricionais.pos_treino);
    }

    html += '</div>';
    return html;
}

function adicionarDelimitadoresPagina(container) {
    const altura = container.scrollHeight;
    const numPaginas = Math.ceil(altura / PDF_CONFIG.A4_HEIGHT_PX);

    for (let i = 1; i < numPaginas; i++) {
        const posicao = PDF_CONFIG.A4_HEIGHT_PX * i;
        const delimitador = document.createElement('div');
        delimitador.style.cssText = `
            position: absolute;
            top: ${posicao}px;
            left: 0;
            right: 0;
            height: 3px;
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
        container.appendChild(delimitador);
    }
}

function criarIndicadorPaginas(numPaginas) {
    if (numPaginas <= 1) return null;

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
    
    return indicador;
}

function adicionarMarcadoresQuebra(container, numPaginas) {
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
        container.appendChild(marcador);
    }
}

function abrirPreviewPDF() {
    const plano = obterPlanoTreino();

    if (!plano?.nome_da_rotina) {
        alert('Nenhum plano de treino encontrado para visualizar.');
        return;
    }

    // Criar modal
    const modal = document.createElement('div');
    modal.id = 'previewModal';
    modal.style.cssText = PDF_CONFIG.STYLES.modal.overlay;

    // Função de fechamento
    const fecharModal = () => {
        document.removeEventListener('keydown', handleKeyDown);
        if (document.body.contains(modal)) {
            document.body.removeChild(modal);
        }
    };

    // Fechar ao clicar no overlay
    modal.addEventListener('click', (e) => {
        if (e.target === modal) fecharModal();
    });

    // Fechar com ESC
    const handleKeyDown = (e) => {
        if (e.key === 'Escape') fecharModal();
    };
    document.addEventListener('keydown', handleKeyDown);

    // Container principal
    const container = document.createElement('div');
    container.style.cssText = PDF_CONFIG.STYLES.modal.container;

    // Botão fechar (X)
    container.appendChild(criarBotaoFechar(fecharModal));

    // Conteúdo do preview
    const previewContent = document.createElement('div');
    previewContent.innerHTML = gerarConteudoPDF(plano);
    previewContent.style.cssText = PDF_CONFIG.STYLES.modal.content;

    // Calcular páginas e adicionar indicadores
    const numPaginas = Math.ceil(previewContent.scrollHeight / PDF_CONFIG.A4_HEIGHT_PX);
    
    const indicador = criarIndicadorPaginas(numPaginas);
    if (indicador) {
        previewContent.insertBefore(indicador, previewContent.firstChild);
    }
    
    adicionarMarcadoresQuebra(previewContent, numPaginas);
    container.appendChild(previewContent);

    // Botões de ação
    const botoesContainer = document.createElement('div');
    botoesContainer.style.cssText = PDF_CONFIG.STYLES.modal.buttonContainer;

    const btnGerarPDF = criarBotaoEstilizado(
        'Gerar PDF',
        PDF_CONFIG.PRIMARY_COLOR,
        PDF_CONFIG.PRIMARY_HOVER,
        () => {
            fecharModal();
            gerarPDFCompleto(null, true);
        }
    );

    const btnFechar = criarBotaoEstilizado('Fechar', '#666', '#555', fecharModal);

    botoesContainer.appendChild(btnGerarPDF);
    botoesContainer.appendChild(btnFechar);
    container.appendChild(botoesContainer);

    modal.appendChild(container);
    document.body.appendChild(modal);
}

function obterOpcoesHTML2PDF(nomeArquivo) {
    const mobile = isMobileDevice();
    
    return {
        margin: [10, 10, 10, 10],
        filename: nomeArquivo,
        image: { type: 'jpeg', quality: 0.95 },
        html2canvas: {
            scale: mobile ? 1 : 2,
            useCORS: true,
            allowTaint: true,
            logging: false,
            backgroundColor: '#ffffff',
            x: 0,
            y: 0,
            scrollX: 0,
            scrollY: 0,
            windowWidth: PDF_CONFIG.A4_WIDTH_PX,
            onclone: (clonedDoc) => {
                const clonedElement = clonedDoc.getElementById('pdf-render-container');
                if (clonedElement) {
                    clonedElement.style.left = '0';
                    clonedElement.style.position = 'relative';
                }
            }
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };
}

function limparContainerPDF(wrapper) {
    if (document.body.contains(wrapper)) {
        document.body.removeChild(wrapper);
    }
}

function atualizarBotaoPDF(btn, texto) {
    if (btn) btn.textContent = texto;
}

function gerarPDFCompleto(e, comDelimitadores = true) {
    const plano = obterPlanoTreino();

    if (!plano?.nome_da_rotina) {
        alert('Nenhum plano de treino encontrado para gerar o PDF.');
        return;
    }

    if (e?.preventDefault) e.preventDefault();

    // Atualizar estado do botão
    const btn = document.querySelector('#btnGeneratePDF');
    const textoOriginal = btn?.textContent || 'Gerar PDF';
    atualizarBotaoPDF(btn, 'Gerando PDF...');

    // Criar container de renderização
    const { wrapper, content } = criarContainerPDF();
    content.innerHTML = gerarConteudoPDF(plano);
    document.body.appendChild(wrapper);

    // Aguardar renderização do DOM e gerar PDF
    setTimeout(() => {
        if (comDelimitadores) {
            adicionarDelimitadoresPagina(content);
        }

        const nomeArquivo = gerarNomeArquivoPDF(plano.nome_da_rotina);
        const opcoes = obterOpcoesHTML2PDF(nomeArquivo);

        // Verificar se a biblioteca está carregada
        if (typeof html2pdf === 'undefined') {
            console.error('Biblioteca html2pdf não carregada.');
            atualizarBotaoPDF(btn, textoOriginal);
            limparContainerPDF(wrapper);
            alert('Ferramenta de geração de PDF ainda não carregada. Tente novamente em alguns segundos.');
            return;
        }

        // Gerar e salvar PDF
        html2pdf()
            .from(content)
            .set(opcoes)
            .save(nomeArquivo)
            .then(() => {
                atualizarBotaoPDF(btn, textoOriginal);
                limparContainerPDF(wrapper);
            })
            .catch((err) => {
                console.error('Erro ao gerar PDF:', err);
                atualizarBotaoPDF(btn, textoOriginal);
                limparContainerPDF(wrapper);
                alert('Erro ao gerar PDF. Tente novamente.');
            });
    }, PDF_CONFIG.RENDER_DELAY_MS);
}

function inicializarBotoesPDF() {
    const btnGeneratePDF = document.querySelector('#btnGeneratePDF');
    const btnPreviewPDF = document.querySelector('#btnPreviewPDF');

    if (btnGeneratePDF) {
        btnGeneratePDF.addEventListener('click', (e) => gerarPDFCompleto(e));
    }

    if (btnPreviewPDF) {
        btnPreviewPDF.addEventListener('click', () => abrirPreviewPDF());
    }
}

// Inicializar quando o DOM estiver pronto
inicializarBotoesPDF();
