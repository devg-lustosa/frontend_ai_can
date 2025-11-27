// app/scripts/storage-manager.js
// Gerenciador centralizado de localStorage com validação e metadados

class StorageManager {
    static CONFIG = {
        PLAN_KEY: 'aican_resposta',
        METADATA_KEY: 'aican_metadata',
        SOLICITACAO_KEY: 'aican_solicitacao',
        TOKEN_KEY: 'token',
        USER_NAME: 'user_name',
        EXPIRATION_HOURS: 24,
        MAX_SIZE_KB: 800
    };

    /**
     * Salva dados no localStorage com metadados
     * @param {string} key - Chave de armazenamento
     * @param {any} data - Dados a serem salvos
     * @returns {boolean} Sucesso da operação
     */
    static save(key, data) {
        try {
            const jsonData = JSON.stringify(data);
            const sizeKB = new Blob([jsonData]).size / 1024;

            if (sizeKB > this.CONFIG.MAX_SIZE_KB) {
                console.warn(`Dados muito grandes: ${sizeKB.toFixed(2)}KB (máx: ${this.CONFIG.MAX_SIZE_KB}KB)`);
                return false;
            }

            localStorage.setItem(key, jsonData);

            // Salvar metadados se for um dado principal (não token ou nome)
            if (key === this.CONFIG.PLAN_KEY || key === this.CONFIG.SOLICITACAO_KEY) {
                this.saveMetadata(key, sizeKB);
            }

            console.log(`Salvo em localStorage: ${key} (${sizeKB.toFixed(2)}KB)`);
            return true;
        } catch (error) {
            console.error(`Erro ao salvar ${key}:`, error);
            return false;
        }
    }

    /**
     * Carrega dados do localStorage
     * @param {string} key - Chave de armazenamento
     * @returns {any|null} Dados carregados ou null
     */
    static load(key) {
        try {
            const data = localStorage.getItem(key);
            if (!data) return null;

            if (key === this.CONFIG.PLAN_KEY || key === this.CONFIG.SOLICITACAO_KEY) {
                if (this.isExpired(key)) {
                    console.log(`Dados expirados: ${key}`);
                    this.remove(key);
                    return null;
                }
            }

            return JSON.parse(data);
        } catch (error) {
            console.error(`Erro ao carregar ${key}:`, error);
            this.remove(key);
            return null;
        }
    }

    /**
     * Remove item do localStorage
     * @param {string} key - Chave a ser removida
     */
    static remove(key) {
        try {
            localStorage.removeItem(key);

            if (key === this.CONFIG.PLAN_KEY || key === this.CONFIG.SOLICITACAO_KEY) {
                localStorage.removeItem(`${key}_metadata`);
            }

            console.log(`Removido do localStorage: ${key}`);
        } catch (error) {
            console.error(`Erro ao remover ${key}:`, error);
        }
    }

    /**
     * Limpa todo o localStorage
     */
    static clear() {
        try {
            localStorage.clear();
            console.log('localStorage limpo completamente');
        } catch (error) {
            console.error('Erro ao limpar localStorage:', error);
        }
    }

    /**
     * Verifica se dados estão expirados
     * @param {string} key - Chave a verificar
     * @returns {boolean} True se expirado
     */
    static isExpired(key) {
        try {
            const metadata = localStorage.getItem(`${key}_metadata`);
            if (!metadata) return true;

            const { timestamp } = JSON.parse(metadata);
            const now = Date.now();
            const hoursElapsed = (now - timestamp) / (1000 * 60 * 60);

            return hoursElapsed > this.CONFIG.EXPIRATION_HOURS;
        } catch (error) {
            console.error('Erro ao verificar expiração:', error);
            return true;
        }
    }

    /**
     * Salva metadados de um item
     * @param {string} key - Chave do item
     * @param {number} sizeKB - Tamanho em KB
     */
    static saveMetadata(key, sizeKB) {
        try {
            const metadata = {
                timestamp: Date.now(),
                size: sizeKB,
                version: '2.0'
            };
            localStorage.setItem(`${key}_metadata`, JSON.stringify(metadata));
        } catch (error) {
            console.error('Erro ao salvar metadados:', error);
        }
    }

    /**
     * Obtém informações sobre o armazenamento
     * @returns {Object} Informações de uso
     */
    static getStorageInfo() {
        try {
            let totalSize = 0;
            const items = [];

            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                const value = localStorage.getItem(key);
                const size = new Blob([value]).size / 1024;

                totalSize += size;
                items.push({ key, sizeKB: size.toFixed(2) });
            }

            return {
                totalSizeKB: totalSize.toFixed(2),
                itemCount: localStorage.length,
                items: items
            };
        } catch (error) {
            console.error('Erro ao obter informações:', error);
            return null;
        }
    }

    /**
     * Limpa dados expirados automaticamente
     */
    static cleanExpired() {
        try {
            const keysToCheck = [this.CONFIG.PLAN_KEY, this.CONFIG.SOLICITACAO_KEY];

            keysToCheck.forEach(key => {
                if (this.isExpired(key)) {
                    this.remove(key);
                }
            });

            console.log('Limpeza de dados expirados concluída');
        } catch (error) {
            console.error('Erro ao limpar expirados:', error);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    StorageManager.cleanExpired();
});
