import Foundation

class AuthService {
    static let shared = AuthService()
    
    private let apiService = APIService.shared
    private let tokenKey = "auth_token"
    
    private init() {}
    
    // MARK: - Token Management
    
    func saveToken(_ token: String) {
        // Guardar token en Keychain
        KeychainHelper.standard.save(token, service: "tuconserje", account: tokenKey)
        apiService.setAuthToken(token)
    }
    
    func getToken() -> String? {
        return KeychainHelper.standard.read(service: "tuconserje", account: tokenKey)
    }
    
    func deleteToken() {
        KeychainHelper.standard.delete(service: "tuconserje", account: tokenKey)
        apiService.clearAuthToken()
    }
    
    // MARK: - Authentication
    
    func login(email: String, password: String, completion: @escaping (Result<User, APIError>) -> Void) {
        let body = ["email": email, "password": password]
        
        apiService.request(endpoint: "/api/auth/login", method: "POST", body: body) { (result: Result<AuthResponse, APIError>) in
            switch result {
            case .success(let response):
                self.saveToken(response.token)
                completion(.success(response.user))
            case .failure(let error):
                completion(.failure(error))
            }
        }
    }
    
    func register(name: String, email: String, password: String, completion: @escaping (Result<User, APIError>) -> Void) {
        let body = ["name": name, "email": email, "password": password]
        
        apiService.request(endpoint: "/api/auth/register", method: "POST", body: body) { (result: Result<AuthResponse, APIError>) in
            switch result {
            case .success(let response):
                self.saveToken(response.token)
                completion(.success(response.user))
            case .failure(let error):
                completion(.failure(error))
            }
        }
    }
    
    func logout() {
        deleteToken()
    }
    
    func isLoggedIn() -> Bool {
        return getToken() != nil
    }
}

struct AuthResponse: Codable {
    let token: String
    let user: User
}