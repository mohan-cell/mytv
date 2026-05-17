import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

const SUPABASE_URL = 'https://tfqwfggmsytdrupgjeyx.supabase.co/rest/v1/';
const SUPABASE_ANON_KEY = 'sb_publishable_avFD_PHiO1606ASaJUOVmg_rQAmsOCx';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function checkAuth(requiredRole = null) {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
        window.location.href = 'index.html';
        return null;
    }
    const { data: profile } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
    
    if (requiredRole && profile.role !== requiredRole) {
        alert('Unauthorized access');
        window.location.href = 'index.html';
    }
    return { session, profile };
}

export async function logout() {
    await supabase.auth.signOut();
    window.location.href = 'index.html';
}