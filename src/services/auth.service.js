import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';
const JWT_EXPIRES = '100h';
const REFRESH_EXPIRES = '7d';

export const register = async (data) => {
    const { firstName, lastName, email, password, roleId, statusId } = data;

    // Vérifier si l'email existe déjà
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        throw new Error('Cet email est déjà utilisé.');
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur
    const user = await prisma.user.create({
        data: {
            firstName,
            lastName,
            email,
            password: hashedPassword,
            roleId,
            statusId
        }
    });

    return user;
};

export const login = async (email, password) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        throw new Error('Identifiants invalides.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Identifiants invalides.');
    }

    // Générer tokens
    const accessToken = jwt.sign({ userId: user.id, roleId: user.roleId }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
    const refreshToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: REFRESH_EXPIRES });

    return { accessToken, refreshToken, user };
};

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch {
        throw new Error('Token invalide ou expiré.');
    }
};

export const refreshToken = (token) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const newAccessToken = jwt.sign({ userId: decoded.userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
        return { accessToken: newAccessToken };
    } catch {
        throw new Error('Refresh token invalide ou expiré.');
    }
};

export const getProfile = async (userId) => {
    return prisma.user.findUnique({
        where: { id: userId },
        include: { role: true, status: true }
    });
};